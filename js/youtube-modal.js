// NOTE: We have to load this script before calling $(document).foundation() (or call it later again) in order to let Foundation apply the correct styles

$("script").first().before(
    "<section id='video-modal' class='reveal-modal' data-reveal>" +
        "<h2></h2>" +
        "<div class='flex-video'></div>" +
        "<a class='close-reveal-modal'>&#215;</a>" +
    "</section>"
);

function isMobile() {
    return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent);
}

$("[data-yt-id]").on("click", function (e) {
    var $window = $(window);
    // don't show the modal on mobile devices - these will probably provide an option to open videos in some app
    if(isMobile() || $window.width() < 400) {
        return;
    }

    e.preventDefault();
    var $this = $(this),
        youTubeId = $this.data("yt-id"),
        modalTitle = $this.text(),
        youTubeLink = $this.attr("href"),
        $modal = $("#video-modal"),
        translationId = $this.data("i18n");

    function onResize() {
        var windowHeight = $window.height(),
            windowWidth = $window.width(),
            elemWidth = Math.min(1.25 * windowHeight, 0.95 * windowWidth);

        /*
        #video-modal {
            max-width: 95vw;
            margin-left: -62.5vh;
        }
        */
        $modal
            .css("width", elemWidth)
            .css("margin-left", -0.5 * elemWidth)
            .find(".flex-video").toggleClass("widescreen", !!(windowWidth > windowHeight));
    }
    function setTitle(title) {
        $modal.find("h2").html("<a href='" + youTubeLink + "'>" + title + "</a>");
    }

    setTitle(modalTitle);
    if (i18nLoaded.state() == "pending") {
        i18nLoaded.done(function () {
            setTitle(i18n.t(translationId));
        });
    }
    $modal.find(".flex-video").html("<iframe width='420' height='315' src='//www.youtube.com/embed/" + youTubeId + (youTubeId.indexOf("?") > -1 ? "&" : "?") + "autoplay=1' frameborder='0' allowfullscreen></iframe>");
    $modal.foundation("reveal", "open");

    // scroll modal into view
    $modal.on("opened", function () {
        $window.on("resize", onResize);
        onResize();

        var scrollTop = $modal.offset().top - $("#header-wrapper").height() + 10;
        $("html, body").animate({scrollTop: scrollTop}, 500, function () {
            $(this).scrollTop(scrollTop);
        });
    });
    $modal.on("close", function () {
        $window.off("resize", onResize);
    });
});
