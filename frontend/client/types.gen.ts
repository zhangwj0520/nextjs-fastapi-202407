// 文件由@zhangwj0520/openapi-ts生成

export type Body_login_login_form = {
    grant_type?: string | null;
    username: string;
    password: string;
    scope?: string;
    client_id?: string | null;
    client_secret?: string | null;
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type LoginModel = {
    username: string;
    password: string;
};

export type Message = {
    message: string;
};

/**
 * Represents a Post record
 */
export type Post = {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    published: boolean;
    author?: User | null;
    authorId?: string | null;
    createdAt: string;
    updatedAt: string;
};

/**
 * Required arguments to the Post create method, without relations
 */
export type PostCreateWithoutRelationsInput = {
    id?: string;
    created_at?: string;
    updated_at?: string;
    authorId?: string | null;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    published: boolean;
};

export type PostUpdateManyWithoutRelationsInput = {
    create?: Array<PostCreateWithoutRelationsInput>;
    connect?: Array<_PostWhereUnique_id_Input>;
    set?: Array<_PostWhereUnique_id_Input>;
    disconnect?: Array<_PostWhereUnique_id_Input>;
    delete?: Array<_PostWhereUnique_id_Input>;
};

export type SendEmail = {
    email_to: string;
};

export type Token = {
    access_token: string;
    token_type?: string;
};

/**
 * Represents a User record
 */
export type User = {
    id: string;
    name?: string | null;
    email: string;
    username: string;
    hashed_password: string;
    disabled: boolean;
    image?: string | null;
    posts?: Array<Post> | null;
    createdAt: string;
    updatedAt: string;
};

export type UserCreate = {
    username: string;
    password: string;
    email?: string | null;
};

/**
 * Optional arguments for updating a record
 */
export type UserUpdateInput = {
    id?: string;
    name?: string | null;
    email?: string;
    username?: string;
    hashed_password?: string;
    disabled?: boolean;
    image?: string | null;
    posts?: PostUpdateManyWithoutRelationsInput;
    createdAt?: string;
    updatedAt?: string;
};

export type UserWihoutPassword = {
    id: string;
    name?: string | null;
    email: string;
    username: string;
    disabled: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type UserWithoutRelations = {
    id: string;
    name?: string | null;
    email: string;
    username: string;
    hashed_password: string;
    disabled: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type UsersList = {
    list: Array<UserWihoutPassword>;
    total: number;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type _PostWhereUnique_id_Input = {
    id: string;
};

export type PostLoginFormApiData = {
    formData: Body_login_login_form;
};

export type PostLoginFormApiResponse = Token;

export type PostLoginApiData = {
    requestBody: LoginModel;
};

export type PostLoginApiResponse = User;

export type GetReadUsersMeApiResponse = User;

export type GetReadOwnItemsApiResponse = Array<{
    [key: string]: (string);
}>;

export type GetListUsersApiData = {
    skip?: number;
    take?: number;
};

export type GetListUsersApiResponse = UsersList;

export type PostCreateUserApiData = {
    requestBody: UserCreate;
};

export type PostCreateUserApiResponse = User;

export type GetGetUserApiData = {
    userId: number;
};

export type GetGetUserApiResponse = UserWihoutPassword | null;

export type PutUpdateUserApiData = {
    requestBody: UserUpdateInput;
    userId: number;
};

export type PutUpdateUserApiResponse = UserWithoutRelations;

export type DeleteDeleteUserApiData = {
    userId: number;
};

export type DeleteDeleteUserApiResponse = User;

export type GetRootApiResponse = unknown;

export type PostTestEmailApiData = {
    requestBody: SendEmail;
};

export type PostTestEmailApiResponse = Message;

export type $OpenApiTs = {
    '/api/login-form': {
        post: {
            req: PostLoginFormApiData;
            res: {
                /**
                 * Successful Response
                 */
                200: Token;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/api/login': {
        post: {
            req: PostLoginApiData;
            res: {
                /**
                 * Successful Response
                 */
                200: User;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/api/user/me': {
        get: {
            res: {
                /**
                 * Successful Response
                 */
                200: User;
            };
        };
    };
    '/api/user/me/items': {
        get: {
            res: {
                /**
                 * Successful Response
                 */
                200: Array<{
                    [key: string]: (string);
                }>;
            };
        };
    };
    '/api/user': {
        get: {
            req: GetListUsersApiData;
            res: {
                /**
                 * Successful Response
                 */
                200: UsersList;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
        post: {
            req: PostCreateUserApiData;
            res: {
                /**
                 * Successful Response
                 */
                201: User;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/api/user/{user_id}': {
        get: {
            req: GetGetUserApiData;
            res: {
                /**
                 * Successful Response
                 */
                200: UserWihoutPassword | null;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
        put: {
            req: PutUpdateUserApiData;
            res: {
                /**
                 * Successful Response
                 */
                200: UserWithoutRelations;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
        delete: {
            req: DeleteDeleteUserApiData;
            res: {
                /**
                 * Successful Response
                 */
                200: User;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/api/stream': {
        get: {
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
            };
        };
    };
    '/api/utils/test-email': {
        post: {
            req: PostTestEmailApiData;
            res: {
                /**
                 * Successful Response
                 */
                201: Message;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
};