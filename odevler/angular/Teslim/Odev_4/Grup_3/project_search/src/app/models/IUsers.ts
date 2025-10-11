
export interface IUsers {
    meta: Meta;
    data: SingleUser[];
}

export interface SingleUser {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    password: string;
    role:     string;
    profile:  string;
    address:  Address;
    phone:    string;
    website:  string;
    company:  Company;
}

export interface Address {
    street:  string;
    suite:   string;
    city:    string;
    zipcode: string;
    geo:     Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name:        string;
    catchPhrase: string;
    bs:          string;
}


export interface Meta {
    status:     number;
    message:    string;
    pagination: Pagination;
}

export interface Pagination {
    page:        number;
    per_page:    number;
    total_items: number;
    total_pages: number;
}
