describe("main", function() {

    beforeEach(function() {
        browser.get("index.html");
    });

    it("should automatically redirect to /home when location fragment is missing", function() {
        expect(browser.getLocationAbsUrl()).toMatch("home");
    });

    it("should display a link labelled 'Login'", function() {
        expect(element(by.css('#nav-login')).isDisplayed()).toBe(true);
        expect(element(by.css('#nav-login')).getText()).toEqual("Login");
    });

    it("should redirect to the login page when the login link is clicked", function() {
        element(by.css("#nav-login")).click();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch("login");
    });

    it("should redirect to the home page when the app name is clicked after going to the login page", function() {
        element(by.css("#nav-login")).click();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch("login");
        element(by.css(".navbar-brand")).click();
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).toMatch("home");
    });

});