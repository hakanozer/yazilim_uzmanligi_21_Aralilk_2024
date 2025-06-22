$(document).ready(function () {

    const accordionObj = $('#accordionExample')
    accordionObj.hide()
    var showStatus = false
    $('#btnShowHide').click(function (e) { 
        // accordionObj.show();
        showStatus = !showStatus
        $(this).text(showStatus == true ? 'Hide': 'Show');
        //accordionObj.toggle();
        //accordionObj.fadeToggle(1000);
        accordionObj.slideToggle(500);
    });

    $('#box').click(function() {
        $('#box').animate(
            {width: '50px', height: '50px' }, 1000, function() {
                $('#box').animate({marginLeft: 100}, 500)
            }
        )
    })

    const inputObj = $('#inputData')
    const btnObj = $('#btnData')

    inputObj.after('<br/>');
    inputObj.val('New Data')
    inputObj.focus()
    

});
