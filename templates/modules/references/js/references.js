$(document).ready(function () {

    // Go to position
    var url = window.location.href;

    if(url.indexOf("referanslarimiz") < 0) {
        gopos("pages", 60, 1);
    }
    $('#scrolwrapper ul li a').click(function () {
        var scrollposition = $('#scrolwrapper').scrollLeft();
        sessionStorage.setItem("scrollpos", scrollposition);
    });
    $('#scrolwrapper').scrollLeft(sessionStorage.getItem("scrollpos"));

}); //doc ready end