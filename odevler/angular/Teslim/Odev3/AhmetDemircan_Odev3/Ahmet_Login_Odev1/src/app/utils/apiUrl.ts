const baseURL = "https://dummyjson.com/users"

// user
export const userUrl = {
    login: `${baseURL}auth/login`,
    register: `${baseURL}auth/signup`,
    profile: `${baseURL}/me`,
    auth: `${baseURL}/auth/me`
}

// products
export const productUrl = {
    products: `${baseURL}products`
}

// categories
export const categoriesUrl = {
    all: `${baseURL}/categories`,
    single: (id: number) => `${baseURL}/categories/${id}`,
}

// comments
export const commentsUrl = {
    all: `${baseURL}/products`,
    single: (id: number) => `${baseURL}/products/${id}`,
}
