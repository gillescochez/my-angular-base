describe("Service abstract api", function() {

    var $httpBackend;
    var mockService;

    beforeEach(module("app.services"));

    beforeEach(inject(function($injector) {

        $httpBackend = $injector.get("$httpBackend");
        $httpBackend.when("GET", config.app.getServerUrl() + "/users").respond("getAll");
        $httpBackend.when("GET", config.app.getServerUrl() + "/users/1").respond("getById");
        $httpBackend.when("POST", config.app.getServerUrl() + "/users").respond("add");
        $httpBackend.when("PUT", config.app.getServerUrl() + "/users/1").respond("save");
        $httpBackend.when("DELETE", config.app.getServerUrl() + "/users/1").respond("remove");

        mockService = services.abstract.api($injector.get("restful"), "users");

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should request GET /users when getAll() is called", function() {
        $httpBackend.expectGET(config.app.getServerUrl() + "/users");
        mockService.getAll();
        $httpBackend.flush();
    });

    it("should request GET /users/id when getById() is called", function() {
        $httpBackend.expectGET(config.app.getServerUrl() + "/users/1");
        mockService.getById(1);
        $httpBackend.flush();
    });

    it("should request POST /users when add() is called", function() {
        $httpBackend.expectPOST(config.app.getServerUrl() + "/users");
        mockService.add({});
        $httpBackend.flush();
    });

    it("should request PUT /users when save() is called", function() {
        $httpBackend.expectPUT(config.app.getServerUrl() + "/users/1");
        mockService.save(1, {});
        $httpBackend.flush();
    });

    it("should request DELETE /users when remove() is called", function() {
        $httpBackend.expectDELETE(config.app.getServerUrl() + "/users/1");
        mockService.remove(1);
        $httpBackend.flush();
    });

});