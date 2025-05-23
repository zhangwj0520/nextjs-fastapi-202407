import { ApiError } from './ApiError'
import type { ApiRequestOptions } from './ApiRequestOptions'
import type { ApiResult } from './ApiResult'
import { CancelablePromise } from './CancelablePromise'
import type { OnCancel } from './CancelablePromise'
import type { OpenAPIConfig } from './OpenAPI'

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isStringWithValue(value: unknown): value is string {
  return isString(value) && value !== ''
}

export function isBlob(value: any): value is Blob {
  return value instanceof Blob
}

export function isFormData(value: unknown): value is FormData {
  return value instanceof FormData
}

export function base64(str: string): string {
  try {
    return btoa(str)
  } catch (err) {
    return Buffer.from(str).toString('base64')
  }
}

export function getQueryString(params: Record<string, unknown>): string {
  const qs: string[] = []

  const append = (key: string, value: unknown) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  }

  const encodePair = (key: string, value: unknown) => {
    if (value === undefined || value === null) {
      return
    }

    if (value instanceof Date) {
      append(key, value.toISOString())
    } else if (Array.isArray(value)) {
      value.forEach(v => encodePair(key, v))
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => encodePair(`${key}[${k}]`, v))
    } else {
      append(key, value)
    }
  }

  Object.entries(params).forEach(([key, value]) => encodePair(key, value))

  return qs.length ? `?${qs.join('&')}` : ''
}

function getUrl(config: OpenAPIConfig, options: ApiRequestOptions): string {
  const encoder = config.ENCODE_PATH || encodeURI

  const path = options.url
    .replace('{api-version}', config.VERSION)
    .replace(/\{(.*?)\}/g, (substring: string, group: string) => {
      if (options.path) {
        if (Object.prototype.hasOwnProperty.call(options.path, group)) {
          return encoder(String(options.path[group]))
        }
      }
      return substring
    })

  const url = config.BASE + path
  return options.query ? url + getQueryString(options.query) : url
}

export function getFormData(options: ApiRequestOptions): FormData | undefined {
  if (options.formData) {
    const formData = new FormData()

    const process = (key: string, value: unknown) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value)
      } else {
        formData.append(key, JSON.stringify(value))
      }
    }

    Object.entries(options.formData)
      .filter(([, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => process(key, v))
        } else {
          process(key, value)
        }
      })

    return formData
  }
  return undefined
}

type Resolver<T> = (options: ApiRequestOptions<T>) => Promise<T>

export async function resolve<T>(options: ApiRequestOptions<T>, resolver?: T | Resolver<T>): Promise<T | undefined> {
  if (typeof resolver === 'function') {
    return (resolver as Resolver<T>)(options)
  }
  return resolver
}

export async function getHeaders<T>(config: OpenAPIConfig, options: ApiRequestOptions<T>): Promise<Headers> {
  const [token, username, password, additionalHeaders] = await Promise.all([
    resolve<any>(options, config.TOKEN),
    resolve<any>(options, config.USERNAME),
    resolve<any>(options, config.PASSWORD),
    resolve<any>(options, config.HEADERS),
  ])

  const headers = Object.entries({
    Accept: 'application/json',
    ...additionalHeaders,
    ...options.headers,
  })
    .filter(([, value]) => value !== undefined && value !== null)
    .reduce((headers, [key, value]) => ({
      ...headers,
      [key]: String(value),
    }), {} as Record<string, string>)

  if (isStringWithValue(token)) {
    headers.Authorization = `Bearer ${token}`
  }

  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`)
    headers.Authorization = `Basic ${credentials}`
  }

  if (options.body !== undefined) {
    if (options.mediaType) {
      headers['Content-Type'] = options.mediaType
    } else if (isBlob(options.body)) {
      headers['Content-Type'] = options.body.type || 'application/octet-stream'
    } else if (isString(options.body)) {
      headers['Content-Type'] = 'text/plain'
    } else if (!isFormData(options.body)) {
      headers['Content-Type'] = 'application/json'
    }
  }

  return new Headers(headers)
}

export function getRequestBody(options: ApiRequestOptions): unknown {
  if (options.body !== undefined) {
    if (options.mediaType?.includes('application/json') || options.mediaType?.includes('+json')) {
      return JSON.stringify(options.body)
    } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
      return options.body
    } else {
      return JSON.stringify(options.body)
    }
  }
  return undefined
}

export async function sendRequest(config: OpenAPIConfig, options: ApiRequestOptions, url: string, body: any, formData: FormData | undefined, headers: Headers, onCancel: OnCancel): Promise<Response> {
  const controller = new AbortController()

  let request: RequestInit = {
    headers,
    body: body ?? formData,
    method: options.method,
    signal: controller.signal,
  }

  if (config.WITH_CREDENTIALS) {
    request.credentials = config.CREDENTIALS
  }

  for (const fn of config.interceptors.request._fns) {
    request = await fn(request)
  }

  onCancel(() => controller.abort())

  return await fetch(url, request)
}

export function getResponseHeader(response: Response, responseHeader?: string): string | undefined {
  if (responseHeader) {
    const content = response.headers.get(responseHeader)
    if (isString(content)) {
      return content
    }
  }
  return undefined
}

export async function getResponseBody(response: Response): Promise<unknown> {
  if (response.status !== 204) {
    try {
      const contentType = response.headers.get('Content-Type')
      if (contentType) {
        const binaryTypes = ['application/octet-stream', 'application/pdf', 'application/zip', 'audio/', 'image/', 'video/']
        if (contentType.includes('application/json') || contentType.includes('+json')) {
          return await response.json()
        } else if (binaryTypes.some(type => contentType.includes(type))) {
          return await response.blob()
        } else if (contentType.includes('multipart/form-data')) {
          return await response.formData()
        } else if (contentType.includes('text/')) {
          return await response.text()
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  return undefined
}

export function catchErrorCodes(result: ApiResult, options: ApiRequestOptions): void {
  if (!result.ok) {
    const error = {
      status: result.status ?? 'unknown',
      statusText: result.statusText ?? 'unknown',
      body: result.body,
    }
    const errorMsg = JSON.stringify(error, null, 2)

    throw new ApiError(options, result, errorMsg)
  }
}

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export function request<T>(config: OpenAPIConfig, options: ApiRequestOptions<T>): CancelablePromise<T> {
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    try {
      const url = getUrl(config, options)
      const formData = getFormData(options)
      const body = getRequestBody(options)
      const headers = await getHeaders(config, options)

      if (!onCancel.isCancelled) {
        let response = await sendRequest(config, options, url, body, formData, headers, onCancel)

        for (const fn of config.interceptors.response._fns) {
          response = await fn(response)
        }

        const responseBody = await getResponseBody(response)
        const responseHeader = getResponseHeader(response, options.responseHeader)

        let transformedBody = responseBody
        if (options.responseTransformer && response.ok) {
          transformedBody = await options.responseTransformer(responseBody)
        }

        const result: ApiResult = {
          url,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? transformedBody,
        }

        catchErrorCodes(result, options)

        resolve(result.body)
      }
    } catch (error) {
      reject(error)
    }
  })
}
