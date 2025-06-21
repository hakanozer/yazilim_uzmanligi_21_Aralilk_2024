$(document).ready(function(){
    // Seçiciler
    // 1. seçici türü: nesneye göre
    $('button').click(function() {
        //alert('Button Submit')
    })
    // 2. seçici türü: id'ye göre
    $('#submit').click(function() {
        //alert('Button Submit Call')
    })
    // 3. seçici türü: class'a göre
    $('.form-label').click(function(){
        alert('Form Label Click')
    })
    // 4. seçici türü: nesne içindeki özelliğe göre(.,#)
    $('div.bg-danger').click(function(){
        alert('Div Click')
    })
    // 5. this seçici türü: hangi nesne seçili ise onun nesnesi üzerinden işlem yap
    $('div#box').click(function(){
        //$(this).css('background-color', 'red') // bg-secondary
        $(this).toggleClass('bg-danger')
    })

    // form submit
    $('#loginForm').submit(function (e) {
        e.preventDefault();// formun sahneyi terk etmesini engeller.
        const email = $('#email').val()
        const password = $('#password').val()
        const remember = $('#remember').is(':checked')
        const city = $('#city').val()
        console.log(email, password, remember, city)
    });

})

// seçici (.) yetenek (.) function(){  }