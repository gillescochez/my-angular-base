describe("Friendly Boolean Filter", function() {

    var friendlyBoolean;

    beforeEach(module("app.services"));
    beforeEach(module("app.filters"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

        var cookie = {};

        $provide.value("$cookieStore", {
            get: function(key) {
                return cookie[key];
            },
            put: function(key, value) {
                cookie[key] = value;
            }
        });

    }));

    it("should return yes if the value is a boolean and true", inject(function(i18n) {
        friendlyBoolean = filters.friendlyBoolean(i18n);
        expect(friendlyBoolean(true)).toEqual(i18n.fetch("yes"));
    }));

    it("should return yes if the value is a string and true", inject(function(i18n) {
        friendlyBoolean = filters.friendlyBoolean(i18n);
        expect(friendlyBoolean("true")).toEqual(i18n.fetch("yes"));
    }));

    it("should return no if the value is a boolean and false", inject(function(i18n) {
        friendlyBoolean = filters.friendlyBoolean(i18n);
        expect(friendlyBoolean(false)).toEqual(i18n.fetch("no"));
    }));

    it("should return no if the value is a string and false", inject(function(i18n) {
        friendlyBoolean = filters.friendlyBoolean(i18n);
        expect(friendlyBoolean("false")).toEqual(i18n.fetch("no"));
    }));

    it("should return the value untouched if it's neither true or false", inject(function(i18n) {
        friendlyBoolean = filters.friendlyBoolean(i18n);
        expect(friendlyBoolean("random")).toEqual("random");
    }));

    it("should return an empty string if no input is specified", inject(function(i18n) {
        friendlyBoolean = filters.friendlyBoolean(i18n);
        expect(friendlyBoolean()).toEqual("");
    }));

});