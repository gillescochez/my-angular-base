describe("session service", function() {

    var cookie;

    beforeEach(module("app.services"));

    // fake $cookieStore for the session service
    beforeEach(module(function($provide) {

        cookie = {};

        $provide.value("$cookieStore", {
            get: function(key) {
                return cookie[key];
            },
            put: function(key, value) {
                cookie[key] = value;
            }
        });

    }));

    // fake restful API for the session service
    beforeEach(module(function($provide) {

        $provide.value("restful", {
            post: function(path, data) {
                return {
                    success: function(callback) {
                        data["auth-token"] = "abcd";
                        data.success = true;
                        callback(data);
                    }
                }
            }
        });

    }));

    it("should expose isLoggedIn, getAuthToken, getUserName, login and logout methods", inject(function(session) {
        expect(session.isLoggedIn).toBeDefined();
        expect(session.getAuthToken).toBeDefined();
        expect(session.getUserName).toBeDefined();
        expect(session.login).toBeDefined();
        expect(session.logout).toBeDefined();
    }));

    it("should return false when isLoggedIn is called if the user is not logged in", inject(function(session) {
        expect(session.isLoggedIn()).toEqual(false);
    }));

    it("should return an empty string when getAuthToken is called if the user is not logged in", inject(function(session) {
        expect(session.getAuthToken()).toEqual("");
    }));

    it("should return an empty string when getUserName is called if the user is not logged in", inject(function(session) {
        expect(session.getUserName()).toEqual("");
    }));

    it("should update the cookie value on create and destroy", inject(function(session) {

        var user = {
            loggedIn: true,
            token: "12345",
            name: "admin"
        };

        session.login("admin", "admin", function() {});

        expect(cookie.user).toBeDefined();
        expect(cookie.user).toEqual(user);

        session.logout();

        expect(cookie.user).toEqual({
            loggedIn: false,
            token: "",
            name: ""
        });

    }));

});