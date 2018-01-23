$(document).ready(function () {
    $('.hamburger').on('click', function (e) {
        $('.nav').show();
        e.stopPropagation();
    });
    
    $('#user').on('click', function (e) {
        $('.nav-menu').show();
        e.stopPropagation();
    });
    
    $('html').on('click', function () {
        if ($(window).width() <= 980) {
            $('.nav').hide();
        }
        
        $('.nav-menu').hide();
    })
    
    $(window).bind('resize', function () {
        if ($(window).width() > 980) {
            $('.nav').attr('style', '');
        }
    });
    
    $('.nav, .nav-menu').on('click', function (e) {
        e.stopPropagation();
    });
});