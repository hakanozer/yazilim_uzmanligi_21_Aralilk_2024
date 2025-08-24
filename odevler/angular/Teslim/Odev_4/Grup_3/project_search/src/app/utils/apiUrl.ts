const baseURL = "https://jsonbulut.com/api/"

// user
export const userUrl = {
    login: `${baseURL}auth/login`,
    register: `${baseURL}auth/signup`,
    profile: `${baseURL}profile/me`,
    logout: `${baseURL}auth/logout`,
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
    search: `${baseURL}products/search`
}

