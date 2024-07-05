// 文件由@zhangwj0520/openapi-ts生成

export type Body_loginForm_api_login_form_post = {
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
    scopes?: Array<(string)>;
};

/**
 * Represents a Post record
 */
export type Post = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    published: boolean;
    author?: User | null;
    author_id?: number | null;
};

/**
 * Required arguments to the Post create method, without relations
 */
export type PostCreateWithoutRelationsInput = {
    id?: number;
    created_at?: string;
    updated_at?: string;
    author_id?: number | null;
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

export type Token = {
    access_token: string;
    token_type?: string;
};

/**
 * Represents a User record
 */
export type User = {
    id: number;
    username: string;
    hashed_password: string;
    email?: string | null;
    disabled: boolean;
    posts?: Array<Post> | null;
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
    id?: _IntSetInput | _IntDivideInput | _IntMultiplyInput | _IntIncrementInput | _IntDecrementInput | number;
    username?: string;
    hashed_password?: string;
    email?: string | null;
    disabled?: boolean;
    posts?: PostUpdateManyWithoutRelationsInput;
};

export type UserWihoutPassword = {
    id: number;
    username: string;
    email?: string | null;
    disabled: boolean;
};

export type UserWithoutRelations = {
    id: number;
    username: string;
    hashed_password: string;
    email?: string | null;
    disabled: boolean;
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

export type _IntDecrementInput = {
    decrement: number;
};

export type _IntDivideInput = {
    divide: number;
};

export type _IntIncrementInput = {
    increment: number;
};

export type _IntMultiplyInput = {
    multiply: number;
};

export type _IntSetInput = {
    set: number;
};

export type _PostWhereUnique_id_Input = {
    id: number;
};

export type PostLoginformApiData = {
    formData: Body_loginForm_api_login_form_post;
};

export type PostLoginformApiResponse = Token;

export type PostLoginApiData = {
    requestBody: LoginModel;
};

export type PostLoginApiResponse = Token;

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

export type $OpenApiTs = {
    '/api/login-form': {
        post: {
            req: PostLoginformApiData;
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
                200: Token;
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
};