$('#hamburger').on('click touchstart', function() {
   $('.nav').toggle();
   return false;
});

$('html').on('click touchstart', function() {
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

$('.nav').on('click touchstart', function(e) {
    e.stopPropagation();    
});
        
