import type { ApiRequestOptions } from './ApiRequestOptions'
import { auth } from '@/auth'

type Headers = Record<string, string>
type Middleware<T> = (value: T) => T | Promise<T>
type Resolver<T> = (options: ApiRequestOptions<T>) => Promise<T>

export class Interceptors<T> {
  _fns: Middleware<T>[]

  constructor() {
    this._fns = []
  }

  eject(fn: Middleware<T>): void {
    const index = this._fns.indexOf(fn)
    if (index !== -1) {
      this._fns = [...this._fns.slice(0, index), ...this._fns.slice(index + 1)]
    }
  }

  use(fn: Middleware<T>): void {
    this._fns = [...this._fns, fn]
  }
}

export class OpenAPIConfig {
  VERSION = '1.0'
  INIT = false
  TYPE: 'client' | 'server' = 'client'
  BASE = process.env.NEXT_PUBLIC_BACKEND_URL
  CREDENTIALS: 'include' | 'omit' | 'same-origin' = 'include'
  WITH_CREDENTIALS: boolean = false
  ENCODE_PATH: ((path: string) => string) | undefined
  HEADERS?: Headers | Resolver<Headers> | undefined
  USERNAME?: string | Resolver<string> | undefined
  PASSWORD?: string | Resolver<string> | undefined
  TOKEN?: string | Resolver<string> | undefined
  interceptors: {
    request: Interceptors<RequestInit>
    response: Interceptors<Response>
  } = {
      request: new Interceptors(),
      response: new Interceptors(),
    }

  constructor(config?: Partial<OpenAPIConfig>) {
    if (config) {
      Object.assign(this, config)
    }
  }

  setConfig(config: Partial<OpenAPIConfig>) {
    console.log('initOpen', config)
    Object.assign(this, config)
    return this
  }

  addRequestInterceptor(fn: Middleware<RequestInit>) {
    this.interceptors.request.use(fn)
    return this
  }

  addResponseInterceptor(fn: Middleware<Response>) {
    this.interceptors.response.use(fn)
    return this
  }
}

export const OpenAPI = new OpenAPIConfig({
})
