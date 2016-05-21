describe("login controller", function() {

    var cookie;

    beforeEach(module("app.controllers"));
    beforeEach(module("app.services"));

    beforeEach(module(function($provide) {

        cookie = {};

        // fake $cookieStore for the session service
        $provide.value("$cookieStore", {
            get: function(key) {
                return cookie[key];
            },
            put: function(key, value) {
                cookie[key] = value;
            }
        });

    }));

    it("should expose date to the template engine", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("main", {
            $scope: scope
        });

        expect(scope.date).toBeDefined();

    }));

    it("should expose i18n to the template engine", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("main", {
            $scope: scope
        });

        expect(scope.i18n).toBeDefined();
        expect(typeof scope.i18n).toEqual("function");

    }));

});