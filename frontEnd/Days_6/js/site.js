// fonksiyon oluşturma
function showAlert() {
    alert("Show Alert!")
}

// değişken oluşturma
// var, let, const
var num1 = 55 // daha sonradan değeri değişebilen
num1 = 45

let num2 = 60 // daha sonradan değeri değişen ama global olamayan değer
num2 = 66

let sum = num1 + num2
console.log("Sum: ", sum)

var stName
let stSurname
function fnc1() {
     stName = 'Ali'
     stSurname = 'Bilmem'
}
fnc1()
console.log("stName:", stName)
console.log("stSurname:", stSurname)

const address = 'İstanbul' // sabit oluluşrma
// address = 'Ankara'
console.log(address)

// selector
function getNameVal() {
    const name = document.getElementById('name') // id değeri "name" olan nesneyi buraya getirdi.
    const nameVal = name.value

    const title = document.getElementById('appTitle')
    const titleVal = title.innerText
    console.log(nameVal, titleVal)
}

function pullList() {
    var html = ''
    var liHtml = ''
    const citiesArr = ['Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya', 'Adana']
    for (let i = 0; i < citiesArr.length; i++) {
        const item = citiesArr[i];
        const selected = item == 'İstanbul' ? 'selected': ''
        const active = item == 'İstanbul' ? 'active': ''
        html += '<option '+selected+' value="'+i+'">'+item+'</option>'
        liHtml += '<li class="list-group-item '+active+'">'+item+'</li>'
    }
    const citiesObj = document.getElementById('cities');
    const ulCitiesObj = document.getElementById('ulCities')
    citiesObj.innerHTML = html
    ulCitiesObj.innerHTML = liHtml
}