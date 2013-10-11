$('#hamburger').click(function(e) {
   $('.nav').show();
   return false;
});

$(document).click(function(e){
    if ($(window).width() <= 890) {
        $('.nav').hide();
    } else {
        $('.nav').show();
    }
})

$(window).bind('resize', function(){
    if ($(window).width() > 890) {
        $('.nav').show();
    }
});

/* For mobile */
$('html').on('touchstart', function(e) {
    $('.nav').hide();
})

$('#hamburger').click(function(event){
    event.stopPropagation();
});    
                  