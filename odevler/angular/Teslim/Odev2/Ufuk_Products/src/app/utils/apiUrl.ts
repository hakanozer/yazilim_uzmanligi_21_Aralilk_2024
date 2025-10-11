const baseURL = "https://dummyjson.com/"

export const productURL = {
    products: `${baseURL}products`,
    productById: (id: number) => `${baseURL}products/${id}`
}