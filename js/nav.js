(function () {
    "use strict";

    var $hamburger = $("#hamburger"),
        $nav = $(".nav"),
        $window = $(window);

    $hamburger.on("click touchstart", function () {
        $nav.toggle();
        return false;
    });

    $("html").on("click touchstart", function () {
        $nav.toggle($window.width() > 890);
    });

    $window.on("resize", function () {
        if ($window.width() > 890) {
            $nav.show();
        }
    });

    $nav.on("click touchstart", function (e) {
        e.stopPropagation();
    });
}());
