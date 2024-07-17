// 文件由 @zhangwj0520/openapi-ts 生成

import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import type { DeleteDeleteUserApiData, DeleteDeleteUserApiResponse, GetGetUserApiData, GetGetUserApiResponse, GetListUsersApiData, GetListUsersApiResponse, GetReadOwnItemsApiResponse, GetReadUsersMeApiResponse, GetRootApiResponse, PostCreateUserApiData, PostCreateUserApiResponse, PostLoginApiData, PostLoginApiResponse, PostLoginFormApiData, PostLoginFormApiResponse, PostTestEmailApiData, PostTestEmailApiResponse, PutUpdateUserApiData, PutUpdateUserApiResponse } from './types.gen'

export class LoginService {
  /**
   * Login Form
   * @param data The data for the request.
   * @param data.formData
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static postLoginFormApi(data: PostLoginFormApiData): CancelablePromise<PostLoginFormApiResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/login-form',
      formData: data.formData,
      mediaType: 'application/x-www-form-urlencoded',
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Login
   * 登录
   *
   * - **username**: 用户名
   * - **password**: 密码
   * - **scopes**: 权限
   * @param data The data for the request.
   * @param data.requestBody
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static postLoginApi(data: PostLoginApiData): CancelablePromise<PostLoginApiResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/login',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    })
  }
}

export class UserService {
  /**
   * Read Users Me
   * @returns User Successful Response
   * @throws ApiError
   */
  public static getReadUsersMeApi(): CancelablePromise<GetReadUsersMeApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/user/me',
    })
  }

  /**
   * Read Own Items
   * @returns string Successful Response
   * @throws ApiError
   */
  public static getReadOwnItemsApi(): CancelablePromise<GetReadOwnItemsApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/user/me/items',
    })
  }

  /**
   * List Users
   * 这个函数的用途是从数据库中检索用户列表
   *
   * 参数:
   * take (int): 表示要检索的用户数量，默认为10
   * skip (int): 表示要跳过的用户数量，用于分页，默认为0
   *
   * 返回值:
   * UsersList: 一个包含检索到的用户列表和总用户数的对象
   * @param data The data for the request.
   * @param data.take
   * @param data.skip
   * @returns UsersList Successful Response
   * @throws ApiError
   */
  public static getListUsersApi(data: GetListUsersApiData = {}): CancelablePromise<GetListUsersApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/user',
      query: {
        take: data.take,
        skip: data.skip,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Create User
   * @param data The data for the request.
   * @param data.requestBody
   * @returns User Successful Response
   * @throws ApiError
   */
  public static postCreateUserApi(data: PostCreateUserApiData): CancelablePromise<PostCreateUserApiResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/user',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Get User
   * @param data The data for the request.
   * @param data.userId
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getGetUserApi(data: GetGetUserApiData): CancelablePromise<GetGetUserApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/user/{user_id}',
      path: {
        user_id: data.userId,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Update User
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns UserWithoutRelations Successful Response
   * @throws ApiError
   */
  public static putUpdateUserApi(data: PutUpdateUserApiData): CancelablePromise<PutUpdateUserApiResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/user/{user_id}',
      path: {
        user_id: data.userId,
      },
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Delete User
   * @param data The data for the request.
   * @param data.userId
   * @returns User Successful Response
   * @throws ApiError
   */
  public static deleteDeleteUserApi(data: DeleteDeleteUserApiData): CancelablePromise<DeleteDeleteUserApiResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/user/{user_id}',
      path: {
        user_id: data.userId,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }
}

export class StreamService {
  /**
   * Root
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getRootApi(): CancelablePromise<GetRootApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/stream',
    })
  }
}

export class UtilsService {
  /**
   * Test Email
   * Test emails.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static postTestEmailApi(data: PostTestEmailApiData): CancelablePromise<PostTestEmailApiResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/utils/test-email',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    })
  }
}
