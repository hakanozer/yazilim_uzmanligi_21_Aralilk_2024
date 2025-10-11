export class Util {
    
    static username:string // static değişken ile, sınıfa ait ve nesne oluşturmadan erişilebilir.
    constructor() {
        Util.username = ''
    }
}
/* Angular'da static anahtar kelimesi, sınıfın kendisine ait olan değişken veya metotları tanımlar.
Yani bu değişken/metotlar sınıfın bir örneği (instance) oluşturulmadan erişilebilir.
Bu, genellikle yardımcı fonksiyonlar veya sabit değerler için kullanılır.
Ne anlama geliyor?
static → sınıfa ait üyeler tanımlar.
Yani nesne oluşturulmasına gerek olmadan doğrudan Util.username şeklinde erişebilirsin.

Kullanımı
Util.username = "Tuba"
console.log(Util.username)  // "Tuba"

Eğer static olmasa idi:

export class Util {
    username: string = ''
}

Bu durumda new Util() yapman gerekirdi:

const u = new Util()
u.username = "Tuba"
console.log(u.username)
✅ Kısacası:
static → değişken/metot sınıfa ait olur, nesne üretmeye gerek yoktur.
Angular projesinde genellikle yardımcı (utility) sınıflar, sabitler, global değişkenler için kullanılır.*/