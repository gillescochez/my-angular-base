describe("login controller", function() {

    var cookie;

    beforeEach(module("app.controllers"));
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

    it("should have an empty username/password/error properties", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("login", {
            $scope: scope
        });

        expect(scope.username).toEqual("");
        expect(scope.password).toEqual("");
        expect(scope.error).toEqual("");

    }));

});