describe("restful service", function() {

    beforeEach(module("app.services"));

    it("should expose a query method", inject(function(restful) {
        expect(restful.query).toBeDefined();
    }));

    it("should expose a post method", inject(function(restful) {
        expect(restful.post).toBeDefined();
    }));

    it("should expose a put method", inject(function(restful) {
        expect(restful.put).toBeDefined();
    }));

    it("should expose a destroy method", inject(function(restful) {
        expect(restful.destroy).toBeDefined();
    }));

    it("should expose a postAndUpload method", inject(function(restful) {
        expect(restful.postAndUpload).toBeDefined();
    }));

    it("should expose a putAndUpload method", inject(function(restful) {
        expect(restful.putAndUpload).toBeDefined();
    }));

});