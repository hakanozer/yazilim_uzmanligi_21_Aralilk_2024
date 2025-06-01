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

function nameTextChange(evt) {
    //const nameObj = document.getElementById('name')
    //const name = nameObj.value
    //console.log(name)
    const name = evt.value
    if (name.toLowerCase() == 'erkan') {
        pullList()
    }else {
        listReset()
    }

    // <i class="bi bi-1-square fs-4"></i>
    const users = ["ali", "veli", "erkan", "zehra"]
    const iconObj = document.getElementById('icon')
    const index = users.findIndex(item => item.toLowerCase() == name.toLowerCase())
    if (index > -1) {
        iconObj.innerHTML = '<i class="bi bi-'+index+'-square"></i>'
    }else {
       iconObj.innerHTML = ''
    }
}

function pullList() {
    var html = ''
    var liHtml = ''
    var selectCity = 'İstanbul'
    const citiesArr = ['Ankara', selectCity, 'İzmir', 'Bursa', 'Antalya', 'Adana']
    for (let i = 0; i < citiesArr.length; i++) {
        const item = citiesArr[i];
        const selected = item == selectCity ? 'selected': ''
        const active = item == selectCity ? 'active': ''
        html += '<option '+selected+' value="'+i+'">'+item+'</option>'
        liHtml += '<li class="list-group-item '+active+'">'+item+'</li>'
    }
    const citiesObj = document.getElementById('cities');
    const ulCitiesObj = document.getElementById('ulCities')
    citiesObj.innerHTML = html
    ulCitiesObj.innerHTML = liHtml
}

function listReset() {
    const citiesObj = document.getElementById('cities');
    const ulCitiesObj = document.getElementById('ulCities')
    citiesObj.innerHTML = ''
    ulCitiesObj.innerHTML = ''
}