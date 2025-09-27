export interface IResult {
    code: number,
    status: boolean,
    message: string,
    data?: any
}

export const jsonResult = (code: number = 200, status: boolean, message: string, data?: any): IResult => {
    return {
        code,
        status,
        message,
        data
    }
}