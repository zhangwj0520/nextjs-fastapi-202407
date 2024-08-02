// 文件由 @zhangwj0520/openapi-ts 生成

export const $Body_login_login_form = {
  properties: {
    grant_type: {
      anyOf: [
        {
          type: 'string',
          pattern: 'password',
        },
        {
          type: 'null',
        },
      ],
      title: 'Grant Type',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
    scope: {
      type: 'string',
      title: 'Scope',
      default: '',
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Client Id',
    },
    client_secret: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Client Secret',
    },
  },
  type: 'object',
  required: ['username', 'password'],
  title: 'Body_login-login_form',
} as const

export const $Faker = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    indexId: {
      type: 'integer',
      title: 'Indexid',
    },
    firstName: {
      type: 'string',
      title: 'Firstname',
    },
    lastName: {
      type: 'string',
      title: 'Lastname',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
    visits: {
      type: 'integer',
      title: 'Visits',
    },
    progress: {
      type: 'integer',
      title: 'Progress',
    },
    status: {
      $ref: '#/components/schemas/FakerStatus',
    },
  },
  type: 'object',
  required: ['id', 'indexId', 'firstName', 'lastName', 'age', 'visits', 'progress', 'status'],
  title: 'Faker',
  description: 'Represents a Faker record',
} as const

export const $FakerStatus = {
  type: 'string',
  enum: ['relationship', 'complicated', 'single'],
  title: 'FakerStatus',
} as const

export const $FeedbackCreateRequestTokenBased = {
  properties: {
    token_or_url: {
      anyOf: [
        {
          type: 'string',
          format: 'uuid',
        },
        {
          type: 'string',
        },
      ],
      title: 'Token Or Url',
    },
    score: {
      anyOf: [
        {
          type: 'number',
        },
        {
          type: 'integer',
        },
        {
          type: 'boolean',
        },
        {
          type: 'null',
        },
      ],
      title: 'Score',
    },
    value: {
      anyOf: [
        {
          type: 'number',
        },
        {
          type: 'integer',
        },
        {
          type: 'boolean',
        },
        {
          type: 'string',
        },
        {
          type: 'object',
        },
        {
          type: 'null',
        },
      ],
      title: 'Value',
    },
    comment: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Comment',
    },
    correction: {
      anyOf: [
        {
          type: 'object',
        },
        {
          type: 'null',
        },
      ],
      title: 'Correction',
    },
    metadata: {
      anyOf: [
        {
          type: 'object',
        },
        {
          type: 'null',
        },
      ],
      title: 'Metadata',
    },
  },
  type: 'object',
  required: ['token_or_url'],
  title: 'FeedbackCreateRequestTokenBased',
  description: 'Shared information between create requests of feedback and feedback objects.',
} as const

export const $HTTPValidationError = {
  properties: {
    detail: {
      items: {
        $ref: '#/components/schemas/ValidationError',
      },
      type: 'array',
      title: 'Detail',
    },
  },
  type: 'object',
  title: 'HTTPValidationError',
} as const

export const $ListResponse_Faker_ = {
  properties: {
    list: {
      items: {
        $ref: '#/components/schemas/Faker',
      },
      type: 'array',
      title: 'List',
    },
    total: {
      type: 'integer',
      title: 'Total',
    },
    newSikp: {
      type: 'integer',
      title: 'Newsikp',
    },
  },
  type: 'object',
  required: ['list', 'total', 'newSikp'],
  title: 'ListResponse[Faker]',
} as const

export const $ListResponse_User_ = {
  properties: {
    list: {
      items: {
        $ref: '#/components/schemas/User',
      },
      type: 'array',
      title: 'List',
    },
    total: {
      type: 'integer',
      title: 'Total',
    },
    newSikp: {
      type: 'integer',
      title: 'Newsikp',
    },
  },
  type: 'object',
  required: ['list', 'total', 'newSikp'],
  title: 'ListResponse[User]',
} as const

export const $LoginModel = {
  properties: {
    username: {
      type: 'string',
      title: 'Username',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
  },
  type: 'object',
  required: ['username', 'password'],
  title: 'LoginModel',
} as const

export const $Message = {
  properties: {
    message: {
      type: 'string',
      title: 'Message',
    },
  },
  type: 'object',
  required: ['message'],
  title: 'Message',
} as const

export const $Post = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    published: {
      type: 'boolean',
      title: 'Published',
    },
    author: {
      anyOf: [
        {
          $ref: '#/components/schemas/User',
        },
        {
          type: 'null',
        },
      ],
    },
    authorId: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Authorid',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Createdat',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      title: 'Updatedat',
    },
  },
  type: 'object',
  required: ['id', 'created_at', 'updated_at', 'title', 'published', 'createdAt', 'updatedAt'],
  title: 'Post',
  description: 'Represents a Post record',
} as const

export const $PostCreateWithoutRelationsInput = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    created_at: {
      type: 'string',
      format: 'date-time',
      title: 'Created At',
    },
    updated_at: {
      type: 'string',
      format: 'date-time',
      title: 'Updated At',
    },
    authorId: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Authorid',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Createdat',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      title: 'Updatedat',
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    published: {
      type: 'boolean',
      title: 'Published',
    },
  },
  type: 'object',
  required: ['title', 'published'],
  title: 'PostCreateWithoutRelationsInput',
  description: 'Required arguments to the Post create method, without relations',
} as const

export const $PostUpdateManyWithoutRelationsInput = {
  properties: {
    create: {
      items: {
        $ref: '#/components/schemas/PostCreateWithoutRelationsInput',
      },
      type: 'array',
      title: 'Create',
    },
    connect: {
      items: {
        $ref: '#/components/schemas/_PostWhereUnique_id_Input',
      },
      type: 'array',
      title: 'Connect',
    },
    set: {
      items: {
        $ref: '#/components/schemas/_PostWhereUnique_id_Input',
      },
      type: 'array',
      title: 'Set',
    },
    disconnect: {
      items: {
        $ref: '#/components/schemas/_PostWhereUnique_id_Input',
      },
      type: 'array',
      title: 'Disconnect',
    },
    delete: {
      items: {
        $ref: '#/components/schemas/_PostWhereUnique_id_Input',
      },
      type: 'array',
      title: 'Delete',
    },
  },
  type: 'object',
  title: 'PostUpdateManyWithoutRelationsInput',
} as const

export const $QiniuFileInfo = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    type: {
      type: 'string',
      enum: ['file', 'dir'],
      title: 'Type',
    },
    name: {
      type: 'string',
      title: 'Name',
    },
    path: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Path',
    },
    putTime: {
      type: 'number',
      title: 'Puttime',
    },
    fsize: {
      type: 'number',
      title: 'Fsize',
    },
    mimeType: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Mimetype',
    },
  },
  type: 'object',
  required: ['id', 'type', 'name', 'putTime', 'fsize'],
  title: 'QiniuFileInfo',
} as const

export const $SendEmail = {
  properties: {
    email_to: {
      type: 'string',
      title: 'Email To',
    },
  },
  type: 'object',
  required: ['email_to'],
  title: 'SendEmail',
} as const

export const $Token = {
  properties: {
    access_token: {
      type: 'string',
      title: 'Access Token',
    },
    token_type: {
      type: 'string',
      title: 'Token Type',
      default: 'bearer',
    },
    user: {
      $ref: '#/components/schemas/User',
    },
  },
  type: 'object',
  required: ['access_token', 'user'],
  title: 'Token',
} as const

export const $User = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    name: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    hashed_password: {
      type: 'string',
      title: 'Hashed Password',
    },
    disabled: {
      type: 'boolean',
      title: 'Disabled',
    },
    image: {
      type: 'string',
      title: 'Image',
    },
    posts: {
      anyOf: [
        {
          items: {
            $ref: '#/components/schemas/Post',
          },
          type: 'array',
        },
        {
          type: 'null',
        },
      ],
      title: 'Posts',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Createdat',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      title: 'Updatedat',
    },
  },
  type: 'object',
  required: ['id', 'email', 'username', 'hashed_password', 'disabled', 'image', 'createdAt', 'updatedAt'],
  title: 'User',
  description: 'Represents a User record',
} as const

export const $UserCreate = {
  properties: {
    username: {
      type: 'string',
      title: 'Username',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
  },
  type: 'object',
  required: ['username', 'password', 'email'],
  title: 'UserCreate',
} as const

export const $UserUpdateInput = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    name: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    hashed_password: {
      type: 'string',
      title: 'Hashed Password',
    },
    disabled: {
      type: 'boolean',
      title: 'Disabled',
    },
    image: {
      type: 'string',
      title: 'Image',
    },
    posts: {
      $ref: '#/components/schemas/PostUpdateManyWithoutRelationsInput',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Createdat',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      title: 'Updatedat',
    },
  },
  type: 'object',
  title: 'UserUpdateInput',
  description: 'Optional arguments for updating a record',
} as const

export const $UserWihoutPassword = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    name: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    disabled: {
      type: 'boolean',
      title: 'Disabled',
    },
    image: {
      type: 'string',
      title: 'Image',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Createdat',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      title: 'Updatedat',
    },
  },
  type: 'object',
  required: ['id', 'email', 'username', 'disabled', 'image', 'createdAt', 'updatedAt'],
  title: 'UserWihoutPassword',
} as const

export const $UserWithoutRelations = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
    name: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    hashed_password: {
      type: 'string',
      title: 'Hashed Password',
    },
    disabled: {
      type: 'boolean',
      title: 'Disabled',
    },
    image: {
      type: 'string',
      title: 'Image',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      title: 'Createdat',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      title: 'Updatedat',
    },
  },
  type: 'object',
  required: ['id', 'email', 'username', 'hashed_password', 'disabled', 'image', 'createdAt', 'updatedAt'],
  title: 'UserWithoutRelations',
} as const

export const $ValidationError = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      type: 'array',
      title: 'Location',
    },
    msg: {
      type: 'string',
      title: 'Message',
    },
    type: {
      type: 'string',
      title: 'Error Type',
    },
  },
  type: 'object',
  required: ['loc', 'msg', 'type'],
  title: 'ValidationError',
} as const

export const $_PostWhereUnique_id_Input = {
  properties: {
    id: {
      type: 'string',
      title: 'Id',
    },
  },
  type: 'object',
  required: ['id'],
  title: '_PostWhereUnique_id_Input',
} as const
