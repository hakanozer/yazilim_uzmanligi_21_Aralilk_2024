// tüm servis IResult türünde mesajlar verecektir.

export interface IResult {
    code: number,
    status: boolean,
    message: string,
    data?: any
}

export const dataResult = (code: number=200, status: boolean, message:string,data?:any): IResult => {
    return {
        code,
        status,
        message,
        data
    }
}