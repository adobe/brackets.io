// Detect unsupported Operating Systems

var ext = "",
    OS = "UNKNOWN";
if (/Windows|Win32|WOW64|Win64/.test(navigator.userAgent)) {
    OS = "WIN";
    ext = ".msi";
} else if (/Mac/.test(navigator.userAgent)) {
    OS = "OSX";
    ext = ".dmg";
} else if (/Linux|X11/.test(navigator.userAgent)) {
    OS = "LINUX32";
    ext = ".32-bit.deb";
    if (/x86_64/.test(navigator.appVersion + navigator.userAgent)) {
        OS = "LINUX64";
        ext = ".64-bit.deb";
    }
}

function updateAlertContent(unsupported) {
    var translatedText = i18n.t("index.page.hero.os-alert." + unsupported.i18nKey, {
        os: unsupported.os,
        defaultValue: unsupported.default,
        url: unsupported.url
    });
    $("#os-alert")
        .html(translatedText)
        .show();
}

var osMatch,
    unsupported = {
        i18nKey: "general",
        url: "https://github.com/adobe/brackets/wiki/Troubleshooting#requirements"
    };

// Windows XP
if (/NT ?5\.\d/.test(navigator.userAgent)) {
    unsupported.os = "Windows XP";
    unsupported.i18nKey = "win-xp";
    unsupported.url = "http://blog.brackets.io/2014/04/18/windows-xp-support/";
    unsupported.default = "Unfortunately, we don't support Windows XP any longer. <a href='" + unsupported.url + "'>Read our blog post</a> for further information.";

    // Mac OS X 10.*
} else if (osMatch = navigator.userAgent.match(/Mac OS X 10[._](\d+)([._](\d+))?\D/i)) {
    osMatch = parseFloat(osMatch[1] + "." + (osMatch[3] || 0));

    // Firefox reports only the OS X major version (10.6), so we have to check for 6.0
    if (osMatch < 6.8 && osMatch !== 6.0) {
        // Mac OS X pre 10.6.8 is not supported
        unsupported.os = "Mac OS X 10." + osMatch;
    }

    // Debian 7
} else if (/Debian[ -_]7/i.test(navigator.userAgent)) {
    unsupported.os = "Debian 7";
    unsupported.i18nKey = "debian-7";
    unsupported.url = "https://github.com/adobe/brackets/issues/4816";
    unsupported.default = "Unfortunately, we currently don't support Debian 7. <a href='" + unsupported.url + "'>Take a look at the GitHub issue</a> for further information.";

    // Ubuntu
} else if (osMatch = navigator.userAgent.match(/Ubuntu[ -_\/]?(\d+)[._](\d+)\D/i)) {
    // Pre-Ubuntu 12.04
    if (parseInt(osMatch[1], 10) < 12) {
        unsupported.os = "Ubuntu " + osMatch[1] + "." + osMatch[2];
    }
}

// The user is running an unsupported OS
if (unsupported.os) {
    if (!unsupported.default) {
        unsupported.default = "Unfortunately, we don't support " + unsupported.os + " any longer. <a href='" + unsupported.url + "'>Take a look at the Requirements.</a>";
    }
    $("#hero-cta-button").hide();
    $(".action-download-brackets").hide();
    updateAlertContent(unsupported);
    if (!i18nLoaded.state() !== "resolved") {
        i18nLoaded.done(function () {
            updateAlertContent(unsupported);
        });
    }
}

var shortLocale = (requestedLang && requestedLang.split("/")[0].split("-")[0]) || "en",
    versionInfoBaseUrl = "//s3.amazonaws.com/files.brackets.io/updates/stable/",
    versionInfoUrl = versionInfoBaseUrl + shortLocale + ".json",
    lookupPromise = new $.Deferred();

if (shortLocale !== "en") {
    $.ajax({
        url: versionInfoUrl,
        type: "HEAD"
    }).fail(function () {
        shortLocale = "en";
        versionInfoUrl = versionInfoBaseUrl + shortLocale + ".json";
    }).always(function () {
        lookupPromise.resolve();
    });
} else {
    lookupPromise.resolve();
}

lookupPromise.done(function () {
    var ajaxRequest = $.ajax({
        dataType: "json",
        url: versionInfoUrl,
        cache: false
    });

    $.when(ajaxRequest, i18nLoaded).done(function (data) {
        var build = data[0][0],
            buildName = build.versionString;

        if (buildName) {
            var buildNum = buildName.match(/([\d.]+)/);
            if (buildNum) {
                buildNum = buildNum[1];
            }

            // update button
            if (OS !== "OTHER" && buildNum) {
                var tag = buildName.toLowerCase().split(" ").join("-"),
                    url = "https://github.com/adobe/brackets/releases/" + tag;

                if (ext) {
                    url = "https://github.com/adobe/brackets/releases/download/" + tag + "/Brackets." + buildName.split(" ").join(".") + ext;
                }

                $(".download-brackets-version").text(buildNum);
                logAndGo(".action-download-brackets", url, ['_trackEvent', 'Downloads', buildNum, OS]);
            }

            // other-download track
            logAndGo("#other-downloads", $("#other-downloads").attr("href"), ['_trackEvent', 'Other-Downloads', buildNum, OS]);
        }

        // update features (limit 5)
        var feature_content = "<h1 class=\"text-center\">" + i18n.t("index.page.content.new-features.new-features-in", {
            defaultValue: "New in " + build.versionString,
            sprintNumber: build.versionString
        }) + "</h1>"; //Fix
        build.newFeatures.slice(0, Math.min(build.newFeatures.length, 5)).forEach(function (feature) {
            feature_content += "<h2 class=\"text-center\">" + $("<div/>").text(feature.name).html() + "</h2>"; //Fix
            feature_content += "<p>" + $("<div/>").text(feature.description).html() + "</p>";
        });
        feature_content += "<p class=\"center-button\"><a class='rounded radius button' href='" + build.releaseNotesURL + "'>" + i18n.t("index.page.content.new-features.release-notes", {
            defaultValue: "Read More in the Release Notes"
        }) + "</a></p>";
        $("#features").html(feature_content);
    });
});

function logAndGo(elementSelector, _url, tagObj) {
    $(elementSelector)
        .attr("href", _url)
        .click(function (e) {
            e.preventDefault();
            var downloadStarted = false;
            setTimeout(function () {
                if (!downloadStarted) window.location.href = _url;
            }, 1200); // fallback
            _gaq.push(tagObj, function () {
                downloadStarted = true;
                setTimeout(function () {
                    window.location.href = _url;
                }, 1000); // short delay just in case it doesn't get logged
            });
        });

}
