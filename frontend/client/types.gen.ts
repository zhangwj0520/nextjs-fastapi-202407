// 文件由 @zhangwj0520/openapi-ts 生成

export interface Body_login_login_form {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export interface HTTPValidationError {
  detail?: Array<ValidationError>
}

export interface ListResponse {
  list: Array<unknown>
  total: number
}

export interface LoginModel {
  username: string
  password: string
}

export interface Message {
  message: string
}

/**
 * Represents a Post record
 */
export interface Post {
  id: string
  created_at: string
  updated_at: string
  title: string
  published: boolean
  author?: User | null
  authorId?: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Required arguments to the Post create method, without relations
 */
export interface PostCreateWithoutRelationsInput {
  id?: string
  created_at?: string
  updated_at?: string
  authorId?: string | null
  createdAt?: string
  updatedAt?: string
  title: string
  published: boolean
}

export interface PostUpdateManyWithoutRelationsInput {
  create?: Array<PostCreateWithoutRelationsInput>
  connect?: Array<_PostWhereUnique_id_Input>
  set?: Array<_PostWhereUnique_id_Input>
  disconnect?: Array<_PostWhereUnique_id_Input>
  delete?: Array<_PostWhereUnique_id_Input>
}

export interface QiniuFileInfo {
  id: string
  type: 'file' | 'dir'
  name: string
  putTime: number
  fsize: number
  mimeType?: string | null
}

export type type = 'file' | 'dir'

export const type = {
  FILE: 'file',
  DIR: 'dir',
} as const

export interface SendEmail {
  email_to: string
}

export interface Token {
  access_token: string
  token_type?: string
  user: User
}

/**
 * Represents a User record
 */
export interface User {
  id: string
  name?: string | null
  email: string
  username: string
  hashed_password: string
  disabled: boolean
  image: string
  posts?: Array<Post> | null
  createdAt: string
  updatedAt: string
}

export interface UserCreate {
  username: string
  password: string
  email: string
}

/**
 * Optional arguments for updating a record
 */
export interface UserUpdateInput {
  id?: string
  name?: string | null
  email?: string
  username?: string
  hashed_password?: string
  disabled?: boolean
  image?: string
  posts?: PostUpdateManyWithoutRelationsInput
  createdAt?: string
  updatedAt?: string
}

export interface UserWihoutPassword {
  id: string
  name?: string | null
  email: string
  username: string
  disabled: boolean
  image: string
  createdAt: string
  updatedAt: string
}

export interface UserWithoutRelations {
  id: string
  name?: string | null
  email: string
  username: string
  hashed_password: string
  disabled: boolean
  image: string
  createdAt: string
  updatedAt: string
}

export interface UsersList {
  list: Array<User>
  newSikp: number
  total: number
}

export interface ValidationError {
  loc: Array<(string | number)>
  msg: string
  type: string
}

export interface _PostWhereUnique_id_Input {
  id: string
}

export interface PostLoginFormApiData {
  formData: Body_login_login_form
}

export type PostLoginFormApiResponse = Token

export interface PostLoginApiData {
  requestBody: LoginModel
}

export type PostLoginApiResponse = Token

export type GetReadUsersMeApiResponse = User

export type GetReadOwnItemsApiResponse = Array<{
  [key: string]: string
}>

export interface GetListUsersApiData {
  skip?: number
  take?: number
}

export type GetListUsersApiResponse = UsersList

export interface PostCreateUserApiData {
  requestBody: UserCreate
}

export type PostCreateUserApiResponse = User

export interface GetGetUserApiData {
  userId: string
}

export type GetGetUserApiResponse = UserWihoutPassword | null

export interface PutUpdateUserApiData {
  requestBody: UserUpdateInput
  userId: string
}

export type PutUpdateUserApiResponse = UserWithoutRelations

export interface DeleteDeleteUserApiData {
  userId: string
}

export type DeleteDeleteUserApiResponse = User

export type GetRootApiResponse = unknown

export interface PostTestEmailApiData {
  requestBody: SendEmail
}

export type PostTestEmailApiResponse = Message

export interface Get列出存储空间下的文件apiData {
  marker?: unknown
  prefix?: unknown
}

export type Get列出存储空间下的文件apiResponse = Array<QiniuFileInfo>

export interface Get列出存储空间下的文件api1Data {
  limit?: unknown
  prefix?: unknown
}

export type Get列出存储空间下的文件api1Response = Array<QiniuFileInfo>

export interface GetFakerUserListApiData {
  pageIndex?: number
  pageSize?: number
}

export type GetFakerUserListApiResponse = ListResponse

export interface $OpenApiTs {
  '/api/login-form': {
    post: {
      req: PostLoginFormApiData
      res: {
        /**
         * Successful Response
         */
        200: Token
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/login': {
    post: {
      req: PostLoginApiData
      res: {
        /**
         * Successful Response
         */
        200: Token
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/user/me': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: User
      }
    }
  }
  '/api/user/me/items': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: Array<{
          [key: string]: string
        }>
      }
    }
  }
  '/api/user': {
    get: {
      req: GetListUsersApiData
      res: {
        /**
         * Successful Response
         */
        200: UsersList
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
    post: {
      req: PostCreateUserApiData
      res: {
        /**
         * Successful Response
         */
        201: User
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/user/{user_id}': {
    get: {
      req: GetGetUserApiData
      res: {
        /**
         * Successful Response
         */
        200: UserWihoutPassword | null
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
    put: {
      req: PutUpdateUserApiData
      res: {
        /**
         * Successful Response
         */
        200: UserWithoutRelations
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
    delete: {
      req: DeleteDeleteUserApiData
      res: {
        /**
         * Successful Response
         */
        200: User
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/stream': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: unknown
      }
    }
  }
  '/api/utils/test-email': {
    post: {
      req: PostTestEmailApiData
      res: {
        /**
         * Successful Response
         */
        201: Message
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/netdisk/list': {
    get: {
      req: Get列出存储空间下的文件apiData
      res: {
        /**
         * Successful Response
         */
        200: Array<QiniuFileInfo>
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/netdisk/listwithlimit': {
    get: {
      req: Get列出存储空间下的文件api1Data
      res: {
        /**
         * Successful Response
         */
        200: Array<QiniuFileInfo>
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/faker/person': {
    get: {
      req: GetFakerUserListApiData
      res: {
        /**
         * Successful Response
         */
        200: ListResponse
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
}
