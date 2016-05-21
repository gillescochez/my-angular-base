describe("toasts controller", function() {

    var rootScope;
    var service;
    var scope;

    beforeEach(module("app.services"));
    beforeEach(module("app.controllers"));
    beforeEach(inject(function($rootScope, $timeout, $controller, toasts) {
        service = toasts;
        scope = $rootScope.$new();
        rootScope = $rootScope;
        $controller("toasts", {
            $scope: scope,
            $rootScope: $rootScope,
            $timeout: $timeout
        });
    }));

    it("should have an empty toasts array", function() {
        expect(scope.toasts.length).toEqual(0);
    });

    it("should set enabled=true on open and enabled=false when close() is called", function() {
        expect(scope.toasts.length).toEqual(0);
        service.info("foo");
        expect(scope.toasts.length).toEqual(1);
        expect(scope.toasts[0].enabled).toEqual(true);
        scope.close(0);
        expect(scope.toasts[0].enabled).toEqual(false);
    });

    it("should have one toast of type info when service method info() is called", function() {
        expect(scope.toasts.length).toEqual(0);
        service.info("foo");
        expect(scope.toasts.length).toEqual(1);
        expect(scope.toasts[0].type).toEqual("info");
        expect(scope.toasts[0].message).toEqual("foo");
    });

    it("should have one toast of type success when service method success() is called", function() {
        expect(scope.toasts.length).toEqual(0);
        service.success("foo");
        expect(scope.toasts.length).toEqual(1);
        expect(scope.toasts[0].type).toEqual("success");
        expect(scope.toasts[0].message).toEqual("foo");
    });

    it("should have one toast of type warning when service method warning() is called", function() {
        expect(scope.toasts.length).toEqual(0);
        service.warning("foo");
        expect(scope.toasts.length).toEqual(1);
        expect(scope.toasts[0].type).toEqual("warning");
        expect(scope.toasts[0].message).toEqual("foo");
    });

    it("should have one toast of type danger when service method error() is called", function() {
        expect(scope.toasts.length).toEqual(0);
        service.error("foo");
        expect(scope.toasts.length).toEqual(1);
        expect(scope.toasts[0].type).toEqual("danger");
        expect(scope.toasts[0].message).toEqual("foo");
    });
});