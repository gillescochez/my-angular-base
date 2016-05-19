describe("restful service", function() {

    beforeEach(module("app.services"));

    it("should expose a query method", inject(function(restful) {
        expect(restful.query).toBeDefined();
    }));

    it("should expose a post method", inject(function(restful) {
        expect(restful.post).toBeDefined();
    }));

});