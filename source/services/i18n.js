/**
 * Internationalization service
 * @param $cookieStore {Object} Angular cookie service
 * @returns {{fetch: fetch}}
 */
services.i18n = function($cookieStore) {

    var main = "en-GB";
    var stored = $cookieStore.get("lang") || null;
    var current = main;

    if (stored !== null && locales[stored]) {
        current = stored;
    }

    return {

        fetch: function(id) {
            return locales[current][id] || locales[main][id] || constants.i18n.not_found + id;
        },

        code: function(code) {
            $cookieStore.put("lang", code);
            current = code;
        }
    };
};

services.i18n.$inject = ["$cookieStore"];