


export const userLogin = (user: ILogin): boolean=>{
    if(!emailvalid(user.email) || !passwordvalid(user)){
        throw new Error('Email or password is not valid');
    }
    return true;
}


export const emailvalid = (email: string)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
// min 6 karakter ve max 15 karakter
// 1 özel karakter
// 1 sayısal karakter
// 1 büyük karakter
export const passwordvalid = (user: ILogin)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    return passwordRegex.test(user.password);
}