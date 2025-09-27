const baseURL = "http://localhost:3001/"

// user
export const userUrl = {
    login: `${baseURL}users`,        // login için fake kontrol yapacağız
    register: `${baseURL}users`,     // yeni kullanıcı ekleme
    profile: `${baseURL}users`,      // kullanıcı bilgisi çekme
    logout: `${baseURL}users`        // logout’u fake yap
}

// courses
export const courseUrl = {
    courses: `${baseURL}courses`
}

// comments
export const commentUrl = {
    comments: `${baseURL}comments`
}

// users
export const usersUrl = {
    users: `${baseURL}users`
}
