export interface IUser {
    meta: Meta;
    data: Data;
}

export interface Meta {
    status:  number;
    message: string;
}

export interface Data {
    access_token: string;
    token_type:   string;
    expires_in:   number;
    user:         User;
}

export interface User {
    id:             number;
    name?:          string;  
    username:       string;
    role?:          string; 
    remember_token?: null;   
    created_at?:    Date;    
    updated_at?:    Date;    
    email?:         string;
    firstName?:     string;
    lastName?:      string;
    gender?:        string;
    image?:         string;
    accessToken?:   string; // Optional, if needed
    refreshToken?:  string;
}

