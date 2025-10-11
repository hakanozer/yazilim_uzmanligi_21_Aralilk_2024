export const RegexControll = (query: string) => {
    // Sadece tehlikeli karakterleri engelle
    const dangerousChars = /[<>\"'%;()&+]/;
    return !dangerousChars.test(query);
}