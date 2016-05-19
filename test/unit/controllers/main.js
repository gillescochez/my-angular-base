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

        // fake session service
        $provide.value("session", {
            username: "",
            setUserName: function(name) {
                this.username = name;
            },
            getUserName: function() {
                return this.username
            },
            logout: function() {
                this.username = "";
            }
        });

    }));

    it("should have an empty username property", inject(function($rootScope, $controller) {

        var scope = $rootScope.$new();

        $controller("main", {
            $scope: scope
        });

        expect(scope.username).toEqual("");

    }));

    it("should have the username property set on login", inject(function($rootScope, $controller, session) {

        var scope = $rootScope.$new();

        $controller("main", {
            $scope: scope
        });

        session.setUserName("foo");

        $rootScope.$broadcast(constants.events.user.login);

        expect(scope.username).toEqual("foo");

    }));

    it("should have an empty username property on logout", inject(function($rootScope, $controller, session) {

        var scope = $rootScope.$new();

        $controller("main", {
            $scope: scope
        });

        session.setUserName("foo");
        $rootScope.$broadcast(constants.events.user.login);

        expect(scope.username).toEqual("foo");

        scope.logout();

        expect(scope.username).toEqual("");

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