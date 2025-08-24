export interface ISearch {
    meta: Meta;
    data: Search[];
}

export interface Search {
    id:                   number;
    title:                string;
    description:          string;
    category:             string;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand?:               string;
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
    query:       string;
    total_items: number;
    total_pages: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toSearchProducts(json: string): ISearch {
        return JSON.parse(json);
    }

    public static searchProductsToJson(value: ISearch): string {
        return JSON.stringify(value);
    }

    public static toDatum(json: string): Search {
        return JSON.parse(json);
    }

    public static datumToJson(value: Search): string {
        return JSON.stringify(value);
    }

    public static toMeta(json: string): Meta {
        return JSON.parse(json);
    }

    public static metaToJson(value: Meta): string {
        return JSON.stringify(value);
    }

    public static toPagination(json: string): Pagination {
        return JSON.parse(json);
    }

    public static paginationToJson(value: Pagination): string {
        return JSON.stringify(value);
    }
}