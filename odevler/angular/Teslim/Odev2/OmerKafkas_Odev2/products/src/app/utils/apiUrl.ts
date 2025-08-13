const baseURL = "https://dummyjson.com/"

export const productsUrl = {
    products: `${baseURL}products`,
    productById: (id: number) => `${baseURL}products/${id}`
}