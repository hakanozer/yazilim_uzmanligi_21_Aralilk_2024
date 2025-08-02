export const userValid = ( username: string) => {
    return username.match

}

export const passwordValid = (password:string) => {
    return password.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/);

}

