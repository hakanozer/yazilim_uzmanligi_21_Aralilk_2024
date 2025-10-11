export const emailValid = (email: string) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
 
export const nameSurnameValid = (name: string) : string => {
    const data = name.trim()
    let status = false
    let words = ''
    if (data.length > 4) {
        const arr = data.split(" ")
        if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (item.length > 1) {
                    status = true
                    words += firstCharUpper(item) + ' ' 
                }else {
                    status = false
                }
            }
        }
    }
    console.log(words)
    return status === true ? words.trim() : ''
    }

export const firstCharUpper = (item:string) : string => {
    item = item.toLocaleLowerCase('tr')
    const first = item[0].toLocaleUpperCase('tr')
    item = item.substring(1, item.length)
    item = first+item
    return item
}