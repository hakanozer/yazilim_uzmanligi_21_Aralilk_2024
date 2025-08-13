export interface IProducts {
    products: Product[];
    total:    number;
    skip:     number;
    limit:    number;
}

export interface Product {
    data: any;
    id:                   number;
    title:                string;
    description:          string;
    category:             Category;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand?:               string;
    sku:                  string;
    weight:               number;
    dimensions:           Dimensions;
    warrantyInformation:  string;
    shippingInformation:  string;
    availabilityStatus:   AvailabilityStatus;
    reviews:              Review[];
    returnPolicy:         ReturnPolicy;
    minimumOrderQuantity: number;
    meta:                 Meta;
    images:               string[];
    thumbnail:            string;
}

export enum AvailabilityStatus {
    InStock = "In Stock",
    LowStock = "Low Stock",
}

export enum Category {
    Beauty = "beauty",
    Fragrances = "fragrances",
    Furniture = "furniture",
    Groceries = "groceries",
}

export interface Dimensions {
    width:  number;
    height: number;
    depth:  number;
}

export interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode:   string;
    qrCode:    string;
}

export enum ReturnPolicy {
    NoReturnPolicy = "No return policy",
    The30DaysReturnPolicy = "30 days return policy",
    The60DaysReturnPolicy = "60 days return policy",
    The7DaysReturnPolicy = "7 days return policy",
    The90DaysReturnPolicy = "90 days return policy",
}

export interface Review {
    rating:        number;
    comment:       string;
    date:          Date;
    reviewerName:  string;
    reviewerEmail: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toIProducts(json: string): IProducts {
        return JSON.parse(json);
    }

    public static iProductsToJson(value: IProducts): string {
        return JSON.stringify(value);
    }

    public static toProduct(json: string): Product {
        return JSON.parse(json);
    }

    public static productToJson(value: Product): string {
        return JSON.stringify(value);
    }

    public static toDimensions(json: string): Dimensions {
        return JSON.parse(json);
    }

    public static dimensionsToJson(value: Dimensions): string {
        return JSON.stringify(value);
    }

    public static toMeta(json: string): Meta {
        return JSON.parse(json);
    }

    public static metaToJson(value: Meta): string {
        return JSON.stringify(value);
    }

    public static toReview(json: string): Review {
        return JSON.parse(json);
    }

    public static reviewToJson(value: Review): string {
        return JSON.stringify(value);
    }
}
