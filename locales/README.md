# How to add translations for a *new* locale

1. Create a subfolder of the `locales` folder whose name is the language or locale you want to
   create a translation for. Just use its two-letter or five-letter code (e.g. `en`, `de`, `pt-BR`).
2. Edit `load.i18next.js`'s first line and set `var production = false`.
3. Copy `locales/_en/translation.json` into your subfolder and start translating! The first step is
   easy, just change the `lang` key to the language you are translating (which is equal to the
   folder your file lives in, i.e. `locales/**/translation.json`).
4. Live preview the file and look for mistakes you made. Please fix them before submitting a
   Pull Request.
5. Update the JSON's `_last.translated` value to the commit SHA you translated last. You can
   find it using the [Commits page](https://github.com/adobe/brackets.io/commits/gh-pages)
   by hovering on the one you used for this translation and click on Copy SHA button.
6. Revert step 2.

Strings not specified in a given locale will fall back to the English strings hardcoded into
the pages `index.html` and `contribute.html`.

Localization is provided via [i18next](http://i18next.com).

# How to modify *existing* translations

For modifying the translations, you basically have to do the same things you do when creating
a new translation. Just do steps 2 - 6, but of course you don't need to create or copy a
`translation.json`, you only need to compare them.