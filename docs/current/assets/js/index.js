/**
 *  All code in the function resetListeners() is from apify
 *
 *  github page - https://github.com/jbalsas/apify
 */

$(function () {
    "use strict";

    // Make search results and dependency links go to correct location in left nav
    if (location.hash === "") {
        var hash = location.href.slice(location.href.lastIndexOf("/") + 1, location.href.length - 5);

        if (hash !== "brackets") {
            location.hash = hash;
        }
    }

    // From main.js
    function resetListeners() {
        $(".show-code").click(function () {
            var block = $(this).parent().find('pre[class*="language-"]');
            block.toggle();
            if (block.is(":visible")) {
                $(this).html("Hide code");
            } else {
                $(this).html("Show code");
            }
        });

        $("input.toggle-public").click(function () {
            var section = $(this).parents("section:eq(0)");
            if ($(this).is(":checked")) {
                section.addClass("show-private");
            } else {
                section.removeClass("show-private");
            }
        });
    }

    // Set left nav links to #, ids to match nav text
    // and add click listeners to load/insert the requested page
    function adjustLinks() {
        $(".span3 a").each(function () {
            var href = $(this).attr("href");

            // Adjust link for context menu
            $(this).on("contextmenu", function () {
                $(this).attr("href", href);
            });

            if (href !== "javascript:;") {
                $(this).attr("href", "#");

                // Add ids to links on left side nav
                if ($(this).text() !== "dependencies") {
                    $(this).attr("id", $(this).text());
                }

                // Add click listeners to left side nav links
                // when clicked they load new content on right side
                $(this).click(function () {

                    // Set class of left nav selected to lnsel
                    $(".lnsel").removeAttr("class");
                    $(this).attr("class", "lnsel");

                    $.get(href, function (data) {
                        var pre = $(data).find(".span9");

                        // Adjust anchor icons' href to match page they link to
                        $(".anchor", pre).each(function () {
                            var anchorHref;

                            anchorHref = $(this).attr("href");
                            $(this).attr("href", href + anchorHref);
                        });

                        // Remove right side content and add modified
                        $(".span9").empty().append(pre.html());

                        // Set scrollbar to top of the content div
                        $(".span9").scrollTop(0);

                        // Convert dependency relative path links to absolute
                        $(".span9 li a").each(function () {
                            var depHref;

                            depHref = $(this).attr("href");
                            depHref = depHref.slice(depHref.lastIndexOf("./") + 2);

                            $(this).attr("href", "http://brackets.io/docs/current/" + depHref);
                        });

                        // After loading/inserting the content reset/attach new listeners
                        resetListeners();
                    });
                });
            }
        });
    }

    adjustLinks();
});
