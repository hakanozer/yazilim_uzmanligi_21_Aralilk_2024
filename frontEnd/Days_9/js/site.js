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
});
