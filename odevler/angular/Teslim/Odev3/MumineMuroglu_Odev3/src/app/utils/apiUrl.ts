const baseURL ='https://dummyjson.com/';


//login
export const userUrl={
    login:`${baseURL}auth/login`
}

//product
export const productUrl={
    product:`${baseURL}products`,
    productById: (id: number) => `${baseURL}products/${id}`
}
