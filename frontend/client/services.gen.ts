// 文件由 @zhangwj0520/openapi-ts 生成

import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import type { DeleteDeleteUserApiData, DeleteDeleteUserApiResponse, GetConfigSchemaApiResponse, GetConfigSchemaWithConfigApiData, GetConfigSchemaWithConfigApiResponse, GetFakerUserListApiData, GetFakerUserListApiResponse, GetGetUserApiData, GetGetUserApiResponse, GetGettongyiApiResponse, GetGetttsApiResponse, GetInputSchemaApiResponse, GetInputSchemaWithConfigApiData, GetInputSchemaWithConfigApiResponse, GetListAllFilesWithMarkerApiData, GetListAllFilesWithMarkerApiResponse, GetListFilesApiData, GetListFilesApiResponse, GetListUsersApiData, GetListUsersApiResponse, GetOutputSchemaApiResponse, GetOutputSchemaWithConfigApiData, GetOutputSchemaWithConfigApiResponse, GetQiniuBucketOverviewApiResponse, GetReadOwnItemsApiResponse, GetReadUsersMeApiResponse, GetRootApiResponse, PostCreateFeedbackFromTokenApiData, PostCreateFeedbackFromTokenApiResponse, PostCreateUserApiData, PostCreateUserApiResponse, PostLoginApiData, PostLoginApiResponse, PostLoginFormApiData, PostLoginFormApiResponse, PostTestEmailApiData, PostTestEmailApiResponse, PutUpdateUserApiData, PutUpdateUserApiResponse } from './types.gen'

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
   * @returns ListResponse_User_ Successful Response
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
   * Input Schema
   * Return the input schema.
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getInputSchemaApi(): CancelablePromise<GetInputSchemaApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/input_schema',
    })
  }

  /**
   * Input Schema With Config
   * Return the input schema.
   * @param data The data for the request.
   * @param data.configHash
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getInputSchemaWithConfigApi(data: GetInputSchemaWithConfigApiData): CancelablePromise<GetInputSchemaWithConfigApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/c/{config_hash}/input_schema',
      path: {
        config_hash: data.configHash,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Output Schema
   * Return the output schema.
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getOutputSchemaApi(): CancelablePromise<GetOutputSchemaApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/output_schema',
    })
  }

  /**
   * Output Schema With Config
   * Return the output schema.
   * @param data The data for the request.
   * @param data.configHash
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getOutputSchemaWithConfigApi(data: GetOutputSchemaWithConfigApiData): CancelablePromise<GetOutputSchemaWithConfigApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/c/{config_hash}/output_schema',
      path: {
        config_hash: data.configHash,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Config Schema
   * Return the config schema.
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getConfigSchemaApi(): CancelablePromise<GetConfigSchemaApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/config_schema',
    })
  }

  /**
   * Config Schema With Config
   * Return the config schema.
   * @param data The data for the request.
   * @param data.configHash
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getConfigSchemaWithConfigApi(data: GetConfigSchemaWithConfigApiData): CancelablePromise<GetConfigSchemaWithConfigApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/c/{config_hash}/config_schema',
      path: {
        config_hash: data.configHash,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Create Feedback From Token
   * Send feedback on an individual run to langsmith.
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static postCreateFeedbackFromTokenApi(data: PostCreateFeedbackFromTokenApiData): CancelablePromise<PostCreateFeedbackFromTokenApiResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/chat/token_feedback',
      body: data.requestBody,
      mediaType: 'application/json',
      errors: {
        422: 'Validation Error',
      },
    })
  }

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

  /**
   * Gettts
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getGetttsApi(): CancelablePromise<GetGetttsApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/stream/tts',
    })
  }

  /**
   * Gettongyi
   * @returns binary Successful Response
   * @throws ApiError
   */
  public static getGettongyiApi(): CancelablePromise<GetGettongyiApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/stream/tongyi',
    })
  }
}

export class ConfigService {
  /**
   * Input Schema With Config
   * Return the input schema.
   * @param data The data for the request.
   * @param data.configHash
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getInputSchemaWithConfigApi(data: GetInputSchemaWithConfigApiData): CancelablePromise<GetInputSchemaWithConfigApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/c/{config_hash}/input_schema',
      path: {
        config_hash: data.configHash,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Output Schema With Config
   * Return the output schema.
   * @param data The data for the request.
   * @param data.configHash
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getOutputSchemaWithConfigApi(data: GetOutputSchemaWithConfigApiData): CancelablePromise<GetOutputSchemaWithConfigApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/c/{config_hash}/output_schema',
      path: {
        config_hash: data.configHash,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Config Schema With Config
   * Return the config schema.
   * @param data The data for the request.
   * @param data.configHash
   * @returns unknown Successful Response
   * @throws ApiError
   */
  public static getConfigSchemaWithConfigApi(data: GetConfigSchemaWithConfigApiData): CancelablePromise<GetConfigSchemaWithConfigApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/chat/c/{config_hash}/config_schema',
      path: {
        config_hash: data.configHash,
      },
      errors: {
        422: 'Validation Error',
      },
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

export class NetdiskService {
  /**
   * List Files
   * 七牛云存储空间下的文件limit=1000
   * @param data The data for the request.
   * @param data.prefix
   * @param data.marker
   * @returns QiniuFileInfo Successful Response
   * @throws ApiError
   */
  public static getListFilesApi(data: GetListFilesApiData = {}): CancelablePromise<GetListFilesApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/netdisk/listlimit',
      query: {
        prefix: data.prefix,
        marker: data.marker,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * List All Files With Marker
   * 七牛云存储空间下的文件
   * @param data The data for the request.
   * @param data.limit
   * @param data.prefix
   * @returns QiniuFileInfo Successful Response
   * @throws ApiError
   */
  public static getListAllFilesWithMarkerApi(data: GetListAllFilesWithMarkerApiData = {}): CancelablePromise<GetListAllFilesWithMarkerApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/netdisk/list',
      query: {
        limit: data.limit,
        prefix: data.prefix,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }

  /**
   * Qiniu Bucket Overview
   * 七牛云存储空间下的文件
   * @returns QiniuOverview Successful Response
   * @throws ApiError
   */
  public static getQiniuBucketOverviewApi(): CancelablePromise<GetQiniuBucketOverviewApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/netdisk/overview',
    })
  }
}

export class FakerService {
  /**
   * Faker User List
   * 这个函数的用途是从数据库中检索用户列表
   *
   * 参数:
   * take (int): 表示要检索的用户数量，默认为10
   * skip (int): 表示要跳过的用户数量，用于分页，默认为0
   *
   * 返回值:
   * UsersList: 一个包含检索到的用户列表和总用户数的对象
   * @param data The data for the request.
   * @param data.pageSize
   * @param data.pageIndex
   * @returns ListResponse_Faker_ Successful Response
   * @throws ApiError
   */
  public static getFakerUserListApi(data: GetFakerUserListApiData = {}): CancelablePromise<GetFakerUserListApiResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/faker/person',
      query: {
        pageSize: data.pageSize,
        pageIndex: data.pageIndex,
      },
      errors: {
        422: 'Validation Error',
      },
    })
  }
}
