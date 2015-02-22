var production = true; // false = development, true = production

var requestedLang,
    lang,
    i18nOptions = {
        fallbackLng: false,
        debug: !production, // console logging (development only)
        detectLngQS: "lang", // use ?lang=... instead of ?setLng=...
        cookieName: "lang", // use cookie "lang" instead of "i18next"
        load: "unspecific", // only use the unspecific locale ("de" instead of "de-DE")
        useLocalStorage: !!production, // cache (production only)
        localStorageExpirationTime: 3 * 24 * 60 * 60 * 1000 // cache: 3 days
    },
    i18nLoaded = new $.Deferred();

i18n.init(i18nOptions)
    .done(function () {
        $(document).i18n({
            twitter: "<a href='https://twitter.com/brackets'>Twitter</a>",
            googlePlus: "<a href='https://plus.google.com/115365194873502050036/posts'>Google+</a>"
        });

        var title = i18n.t($("head title").data("i18n"), { defaultValue: "" });
        if (title) {
            document.title = title;
        }
    })
    .always(function () {
        lang = i18n.t("lang", { defaultValue: "en" });
        $("html").attr("lang", lang);
        i18nLoaded.resolve();
    });
requestedLang = lang = i18n.lng();
