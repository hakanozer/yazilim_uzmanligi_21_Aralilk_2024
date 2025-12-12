const baseURL = "http://localhost:3000/"

// user
export const userUrl = {
    login: `${baseURL}login`, // json-server-auth login endpoint
    register: `${baseURL}register`, // json-server-auth register endpoint
    profile: `${baseURL}users`,
}

// products
export const productUrl = {
    products: `${baseURL}products`
}

// comment
export const commentUrl = {
    comments: `${baseURL}comments`
}

// newslatter
export const newslatterUrl = {
    news: 'http://localhost:3000/newsletter'
}

// users
export const usersUrl = {
    users: `${baseURL}users`
}

export const searchUrl = {
    search: `${baseURL}products?q=`
}

