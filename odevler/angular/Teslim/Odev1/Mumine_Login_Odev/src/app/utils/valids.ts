export const userNameValid = (name: string): string => {
    const data = name.trim();
    return data.length > 3 ? data : '';
}