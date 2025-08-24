export interface IProducts {
    meta: Meta;
    data: Product[];
}

export interface ISingleProduct {
    meta: Meta,
    data: Product
}

export interface Product {
    id:                   number;
    title:                string;
    description:          string;
    category:             string;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand:                string;
    sku:                  string;
    minimumOrderQuantity: number;
    images:               string[];
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
