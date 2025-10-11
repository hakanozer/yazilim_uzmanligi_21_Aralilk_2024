export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}


export interface Data {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: User;
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
