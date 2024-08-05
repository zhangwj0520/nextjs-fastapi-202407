// 文件由 @zhangwj0520/openapi-ts 生成

export interface Body_login_login_form {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

/**
 * Represents a Faker record
 */
export interface Faker {
  id: string
  indexId: number
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: FakerStatus
}

export type FakerStatus = 'relationship' | 'complicated' | 'single'

export const FakerStatus = {
  RELATIONSHIP: 'relationship',
  COMPLICATED: 'complicated',
  SINGLE: 'single',
} as const

/**
 * Shared information between create requests of feedback and feedback objects.
 */
export interface FeedbackCreateRequestTokenBased {
  token_or_url: string
  score?: number | boolean | null
  value?: number | boolean | string | {
    [key: string]: unknown
  } | null
  comment?: string | null
  correction?: {
    [key: string]: unknown
  } | null
  metadata?: {
    [key: string]: unknown
  } | null
}

export interface HTTPValidationError {
  detail?: Array<ValidationError>
}

export interface ListResponse_Faker_ {
  list: Array<Faker>
  total: number
  newSikp: number
}

export interface ListResponse_User_ {
  list: Array<User>
  total: number
  newSikp: number
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
  path?: string | null
  putTime: number
  fsize: number
  mimeType?: string | null
}

export type type = 'file' | 'dir'

export const type = {
  FILE: 'file',
  DIR: 'dir',
} as const

export interface QiniuOverview {
  fileCount: number
  spaceSize: number
  flowSize: number
  hits: number
  sizeTrend: {
    [key: string]: Array<(number)>
  }
}

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

export type GetListUsersApiResponse = ListResponse_User_

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

export type GetInputSchemaApiResponse = unknown

export interface GetInputSchemaWithConfigApiData {
  configHash: string
}

export type GetInputSchemaWithConfigApiResponse = unknown

export type GetOutputSchemaApiResponse = unknown

export interface GetOutputSchemaWithConfigApiData {
  configHash: string
}

export type GetOutputSchemaWithConfigApiResponse = unknown

export type GetConfigSchemaApiResponse = unknown

export interface GetConfigSchemaWithConfigApiData {
  configHash: string
}

export type GetConfigSchemaWithConfigApiResponse = unknown

export interface PostCreateFeedbackFromTokenApiData {
  requestBody: FeedbackCreateRequestTokenBased
}

export type PostCreateFeedbackFromTokenApiResponse = unknown

export type GetRootApiResponse = unknown

export interface PostTestEmailApiData {
  requestBody: SendEmail
}

export type PostTestEmailApiResponse = Message

export interface GetListFilesApiData {
  marker?: unknown
  prefix?: unknown
}

export type GetListFilesApiResponse = Array<QiniuFileInfo>

export interface GetListAllFilesWithMarkerApiData {
  limit?: unknown
  prefix?: unknown
}

export type GetListAllFilesWithMarkerApiResponse = Array<QiniuFileInfo>

export type GetQiniuBucketOverviewApiResponse = QiniuOverview

export interface GetFakerUserListApiData {
  pageIndex?: number
  pageSize?: number
}

export type GetFakerUserListApiResponse = ListResponse_Faker_

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
        200: ListResponse_User_
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
  '/api/chat/input_schema': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: unknown
      }
    }
  }
  '/api/chat/c/{config_hash}/input_schema': {
    get: {
      req: GetInputSchemaWithConfigApiData
      res: {
        /**
         * Successful Response
         */
        200: unknown
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/chat/output_schema': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: unknown
      }
    }
  }
  '/api/chat/c/{config_hash}/output_schema': {
    get: {
      req: GetOutputSchemaWithConfigApiData
      res: {
        /**
         * Successful Response
         */
        200: unknown
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/chat/config_schema': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: unknown
      }
    }
  }
  '/api/chat/c/{config_hash}/config_schema': {
    get: {
      req: GetConfigSchemaWithConfigApiData
      res: {
        /**
         * Successful Response
         */
        200: unknown
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
  '/api/chat/token_feedback': {
    post: {
      req: PostCreateFeedbackFromTokenApiData
      res: {
        /**
         * Successful Response
         */
        200: unknown
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
  '/api/netdisk/listlimit': {
    get: {
      req: GetListFilesApiData
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
  '/api/netdisk/list': {
    get: {
      req: GetListAllFilesWithMarkerApiData
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
  '/api/netdisk/overview': {
    get: {
      res: {
        /**
         * Successful Response
         */
        200: QiniuOverview
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
        200: ListResponse_Faker_
        /**
         * Validation Error
         */
        422: HTTPValidationError
      }
    }
  }
}
