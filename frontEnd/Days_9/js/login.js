$(document).ready(function () {
    $('#message').hide()
    $('#formLogin').submit(function (e) { 
        e.preventDefault();
        $('#message').hide()
        const email = $('#email').val()
        const password = $('#password').val()
        
        // Ajax
        // url
        // sendData
        const url = 'https://jsonbulut.com/api/auth/login'
        const sendObj = {
            email: email,
            password: password
        }

        $.ajax({
            type: "POST",
            url: url,
            data: sendObj,
            dataType: "json",
            success: function (response) {
                const name = response.data.user.name 
                const jwt = response.data.access_token
                console.log( name )
                console.log( jwt )
            },
            error: function (error) {
                //console.log(error.responseJSON.message)
                //alert(error.responseJSON.message)
                $('#message').slideDown()
                $('#message').text(error.responseJSON.message);
            }
        });

    });
});