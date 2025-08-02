

export const emailValid = (email: string) => { 
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
} // burası verilen email değerinin geçerli bir e-posta adresi olup olmadığını kontrol eder. Geçerliyse → RegExp eşleşmesi (truthy) Geçersizse → null (falsy)
 
export const nameSurnameValid = (name: string) : string => {   //nameSurnameValid: Kullanıcının ad-soyad bilgisini doğrular. İsminin En az 4 karakter olması Boşlukla ayrılmış (yani en az 2 kelime) olması Her kelimenin en az 2 harfli olması şartlarına bakar.
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
                    words += firstCharUpper(item) + ' '  //Her kelimenin ilk harfini büyük yapar. (firstCharUpper ile) ✅ Dönen değer: Geçerliyse → Biçimlendirilmiş ad soyad (örn. "Tuba Nur") Geçersizse → '' (boş string) 
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
    item = item.toLocaleLowerCase('tr') // tümünü küçük yap
    const first = item[0].toLocaleUpperCase('tr')  // ilk harfi büyük yap
    item = item.substring(1, item.length) // geri kalan kısmı al
    item = first+item // birleştir
    return item
} 

/*
📌 Görevi:
Verilen kelimenin ilk harfini büyük, kalanını küçük hale getirir.
Türkçe karakterler için toLocaleUpperCase('tr') ve toLocaleLowerCase('tr') kullanır → yani i → İ, ş → Ş gibi dönüşümler doğru yapılır.

💡 Örnek:
firstCharUpper("tuba") // "Tuba"
firstCharUpper("ALİ") // "Ali"


🔚 Genel Özet
Fonksiyon	       Amaç	                                     Döndüğü Veri
emailValid	       Email formatı kontrolü	                 Eşleşme varsa true
nameSurnameValid   Ad soyad kontrolü ve biçimlendirme	     Geçerli ise "Tuba Nur"
firstCharUpper	   Kelimenin ilk harfini büyük yapar (TR)	 "tuba" → "Tuba"

*/