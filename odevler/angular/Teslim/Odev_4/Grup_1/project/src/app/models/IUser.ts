export interface IUser {
    meta: Meta;
    data: Data;
}

export interface Data {
    access_token: string;
    token_type:   string;
    expires_in:   number;
    user:         User;
}

export interface User {
    id:             number;
    name:           string;
    email:          string;
    role:           string;
    remember_token: null;
    created_at:     Date;
    updated_at:     Date;
}

export interface Meta {
    status:  number;
    message: string;
}
