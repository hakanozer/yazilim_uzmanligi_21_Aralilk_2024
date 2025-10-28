export interface IResult<T = any> {
    success: boolean;      // status yerine success daha yaygın
    message: string;
    data?: T;              // Generic tip desteği
    error?: string;        // Hata mesajları için
}

// Başarılı yanıt
export const successResult = <T>(
    message: string, 
    data?: T
): IResult<T> => {
    return {
        success: true,
        message,
        data
    };
};

// Hata yanıtı
export const errorResult = (
    message: string, 
    error?: string
): IResult => {
    return {
        success: false,
        message,
        error
    };
};

// Genel yanıt (eski haliniz - geriye dönük uyumluluk için)
export const jsonResult = <T>(
    status: boolean, 
    message: string, 
    data?: T, 
    error?: string
): IResult<T> => {
    return {
        success: status,
        message,
        data,
        error
    };
};