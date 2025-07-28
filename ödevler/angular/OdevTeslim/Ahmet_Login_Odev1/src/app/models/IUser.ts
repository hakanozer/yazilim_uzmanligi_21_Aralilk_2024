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
    name?:          string;  // optional because new model uses firstName and lastName
    username:       string;
    role?:          string;  // optional, not present in new model
    remember_token?: null;   // optional, not present in new model
    created_at?:    Date;    // optional, not present in new model
    updated_at?:    Date;    // optional, not present in new model

    // New fields from the new model
    email?:         string;
    firstName?:     string;
    lastName?:      string;
    gender?:        string;
    image?:         string;
    accessToken?:   string;  // JWT accessToken for backward compatibility
    refreshToken?:  string;
}

export interface Meta {
    status:  number;
    message: string;
}
