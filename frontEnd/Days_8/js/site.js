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

    // change - değişim olduğunda bir sefer çalış
    $('#email').change(function (e) { 
        console.log("değişti")
    });

    const emails = [
        "alice.smith@gmail.com",
        "bob.johnson@yahoo.com",
        "carol.williams@hotmail.com",
        "david.brown@outlook.com",
        "ali@mail.com",
        "frank.miller@yahoo.com",
        "grace.davis@icloud.com",
        "henry.wilson@gmail.com",
        "irene.moore@hotmail.com",
        "jack.taylor@outlook.com"
    ];
    // değişim olduğunda her harf ile birlikte çalış
    $('#email').keyup(function (e) { 
        //console.log(e.target.value)
        if (e.originalEvent.key == 'Enter') {
            console.log('Enter Tıklanıldı')
        }
        const email = $(this).val()
        // var emailStatus = -1
        /*
        for (let i = 0; i < emails.length; i++) {
            const item = emails[i];
            if (item == email) {
                emailStatus = true
            }
        }
        */
        const emailStatus = emails.findIndex((item) => item == email)
        const answer = emailStatus > -1 ? 'Valid' : 'InValid'
        $('#emailHelp').text(answer);

    });

})

// seçici (.) yetenek (.) function(){  }