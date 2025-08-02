export const firstCharUpper = (item:string) : string => {
    item = item.toLocaleLowerCase('tr')
    const first = item[0].toLocaleUpperCase('tr')
    item = item.substring(1, item.length)
    item = first+item
    return item
}