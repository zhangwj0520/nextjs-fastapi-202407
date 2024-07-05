// 文件由@zhangwj0520/openapi-ts生成

export const $Body_loginForm_api_login_form_post = {
    properties: {
        grant_type: {
            anyOf: [
                {
                    type: 'string',
                    pattern: 'password'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Grant Type'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        password: {
            type: 'string',
            title: 'Password'
        },
        scope: {
            type: 'string',
            title: 'Scope',
            default: ''
        },
        client_id: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Client Id'
        },
        client_secret: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Client Secret'
        }
    },
    type: 'object',
    required: ['username', 'password'],
    title: 'Body_loginForm_api_login_form_post'
} as const;

export const $HTTPValidationError = {
    properties: {
        detail: {
            items: {
                '$ref': '#/components/schemas/ValidationError'
            },
            type: 'array',
            title: 'Detail'
        }
    },
    type: 'object',
    title: 'HTTPValidationError'
} as const;

export const $LoginModel = {
    properties: {
        username: {
            type: 'string',
            title: 'Username'
        },
        password: {
            type: 'string',
            title: 'Password'
        },
        scopes: {
            items: {
                type: 'string'
            },
            type: 'array',
            title: 'Scopes',
            default: ['me1']
        }
    },
    type: 'object',
    required: ['username', 'password'],
    title: 'LoginModel'
} as const;

export const $Post = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        created_at: {
            type: 'string',
            format: 'date-time',
            title: 'Created At'
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
            title: 'Updated At'
        },
        title: {
            type: 'string',
            title: 'Title'
        },
        published: {
            type: 'boolean',
            title: 'Published'
        },
        author: {
            anyOf: [
                {
                    '$ref': '#/components/schemas/User'
                },
                {
                    type: 'null'
                }
            ]
        },
        author_id: {
            anyOf: [
                {
                    type: 'integer'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Author Id'
        }
    },
    type: 'object',
    required: ['id', 'created_at', 'updated_at', 'title', 'published'],
    title: 'Post',
    description: 'Represents a Post record'
} as const;

export const $PostCreateWithoutRelationsInput = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        created_at: {
            type: 'string',
            format: 'date-time',
            title: 'Created At'
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
            title: 'Updated At'
        },
        author_id: {
            anyOf: [
                {
                    type: 'integer'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Author Id'
        },
        title: {
            type: 'string',
            title: 'Title'
        },
        published: {
            type: 'boolean',
            title: 'Published'
        }
    },
    type: 'object',
    required: ['title', 'published'],
    title: 'PostCreateWithoutRelationsInput',
    description: 'Required arguments to the Post create method, without relations'
} as const;

export const $PostUpdateManyWithoutRelationsInput = {
    properties: {
        create: {
            items: {
                '$ref': '#/components/schemas/PostCreateWithoutRelationsInput'
            },
            type: 'array',
            title: 'Create'
        },
        connect: {
            items: {
                '$ref': '#/components/schemas/_PostWhereUnique_id_Input'
            },
            type: 'array',
            title: 'Connect'
        },
        set: {
            items: {
                '$ref': '#/components/schemas/_PostWhereUnique_id_Input'
            },
            type: 'array',
            title: 'Set'
        },
        disconnect: {
            items: {
                '$ref': '#/components/schemas/_PostWhereUnique_id_Input'
            },
            type: 'array',
            title: 'Disconnect'
        },
        delete: {
            items: {
                '$ref': '#/components/schemas/_PostWhereUnique_id_Input'
            },
            type: 'array',
            title: 'Delete'
        }
    },
    type: 'object',
    title: 'PostUpdateManyWithoutRelationsInput'
} as const;

export const $Token = {
    properties: {
        access_token: {
            type: 'string',
            title: 'Access Token'
        },
        token_type: {
            type: 'string',
            title: 'Token Type',
            default: 'bearer'
        }
    },
    type: 'object',
    required: ['access_token'],
    title: 'Token'
} as const;

export const $User = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        hashed_password: {
            type: 'string',
            title: 'Hashed Password'
        },
        email: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        },
        disabled: {
            type: 'boolean',
            title: 'Disabled'
        },
        posts: {
            anyOf: [
                {
                    items: {
                        '$ref': '#/components/schemas/Post'
                    },
                    type: 'array'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Posts'
        }
    },
    type: 'object',
    required: ['id', 'username', 'hashed_password', 'disabled'],
    title: 'User',
    description: 'Represents a User record'
} as const;

export const $UserCreate = {
    properties: {
        username: {
            type: 'string',
            title: 'Username'
        },
        password: {
            type: 'string',
            title: 'Password'
        },
        email: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        }
    },
    type: 'object',
    required: ['username', 'password'],
    title: 'UserCreate'
} as const;

export const $UserUpdateInput = {
    properties: {
        id: {
            anyOf: [
                {
                    '$ref': '#/components/schemas/_IntSetInput'
                },
                {
                    '$ref': '#/components/schemas/_IntDivideInput'
                },
                {
                    '$ref': '#/components/schemas/_IntMultiplyInput'
                },
                {
                    '$ref': '#/components/schemas/_IntIncrementInput'
                },
                {
                    '$ref': '#/components/schemas/_IntDecrementInput'
                },
                {
                    type: 'integer'
                }
            ],
            title: 'Id'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        hashed_password: {
            type: 'string',
            title: 'Hashed Password'
        },
        email: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        },
        disabled: {
            type: 'boolean',
            title: 'Disabled'
        },
        posts: {
            '$ref': '#/components/schemas/PostUpdateManyWithoutRelationsInput'
        }
    },
    type: 'object',
    title: 'UserUpdateInput',
    description: 'Optional arguments for updating a record'
} as const;

export const $UserWihoutPassword = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        email: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        },
        disabled: {
            type: 'boolean',
            title: 'Disabled'
        }
    },
    type: 'object',
    required: ['id', 'username', 'disabled'],
    title: 'UserWihoutPassword'
} as const;

export const $UserWithoutRelations = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        username: {
            type: 'string',
            title: 'Username'
        },
        hashed_password: {
            type: 'string',
            title: 'Hashed Password'
        },
        email: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Email'
        },
        disabled: {
            type: 'boolean',
            title: 'Disabled'
        }
    },
    type: 'object',
    required: ['id', 'username', 'hashed_password', 'disabled'],
    title: 'UserWithoutRelations'
} as const;

export const $UsersList = {
    properties: {
        list: {
            items: {
                '$ref': '#/components/schemas/UserWihoutPassword'
            },
            type: 'array',
            title: 'List'
        },
        total: {
            type: 'integer',
            title: 'Total'
        }
    },
    type: 'object',
    required: ['list', 'total'],
    title: 'UsersList'
} as const;

export const $ValidationError = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'integer'
                    }
                ]
            },
            type: 'array',
            title: 'Location'
        },
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    type: 'object',
    required: ['loc', 'msg', 'type'],
    title: 'ValidationError'
} as const;

export const $_IntDecrementInput = {
    properties: {
        decrement: {
            type: 'integer',
            title: 'Decrement'
        }
    },
    type: 'object',
    required: ['decrement'],
    title: '_IntDecrementInput'
} as const;

export const $_IntDivideInput = {
    properties: {
        divide: {
            type: 'integer',
            title: 'Divide'
        }
    },
    type: 'object',
    required: ['divide'],
    title: '_IntDivideInput'
} as const;

export const $_IntIncrementInput = {
    properties: {
        increment: {
            type: 'integer',
            title: 'Increment'
        }
    },
    type: 'object',
    required: ['increment'],
    title: '_IntIncrementInput'
} as const;

export const $_IntMultiplyInput = {
    properties: {
        multiply: {
            type: 'integer',
            title: 'Multiply'
        }
    },
    type: 'object',
    required: ['multiply'],
    title: '_IntMultiplyInput'
} as const;

export const $_IntSetInput = {
    properties: {
        set: {
            type: 'integer',
            title: 'Set'
        }
    },
    type: 'object',
    required: ['set'],
    title: '_IntSetInput'
} as const;

export const $_PostWhereUnique_id_Input = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        }
    },
    type: 'object',
    required: ['id'],
    title: '_PostWhereUnique_id_Input'
} as const;