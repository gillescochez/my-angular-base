describe("login", function() {

    var username = element(by.model('username'));
    var password = element(by.model('password'));
    var login = element(by.css('.btn.btn-primary'));
    var error = element(by.css('.panel-footer.text-danger'));

    it("should automatically redirect to /login when location fragment is login", function() {
        browser.get("index.html#/login");
        expect(browser.getLocationAbsUrl()).toMatch("login");
    });

    it("should hide the error message area", function() {
        browser.get("index.html#/login");
        expect(error.isDisplayed()).toEqual(false);
    });

    it("should display an error message when login fails", function() {

        browser.get("index.html#/login");
        username.sendKeys("abcd");
        password.sendKeys("abcd");
        login.click();

        expect(error.isDisplayed()).toEqual(true);
        expect(error.getText()).toEqual("Wrong Username/Password");
    });

    it("should redirect to /home when login succeed", function() {

        browser.get("index.html#/login");
        username.sendKeys("admin");
        password.sendKeys("admin");
        login.click();

        browser.waitForAngular();

        expect(browser.getLocationAbsUrl()).toMatch("home");

        element(by.css('#nav-logout')).click();
    });

});