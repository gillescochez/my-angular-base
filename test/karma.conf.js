module.exports = function(config) {

    config.set({

        basePath: "../",

        files: [
            "dependencies/angular/angular.js",
            "dependencies/angular-mocks/angular-mocks.js",
			"source/constants.js",
			"source/namespace.js",
			"source/config/*.js",
			"source/controllers/*.js",
			"source/directives/*.js",
			"source/filters/*.js",
			"source/locales/*.js",
			"source/services/*.js",
			"source/app/*.js",
            "test/unit/*/*.js",
            "test/unit/*.js"
        ],

        autoWatch: true,

        frameworks: ["jasmine"],

        browsers: ["Chrome"],

        plugins: [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine",
            "karma-junit-reporter"
        ],

        junitReporter: {
            outputFile: "test_out/unit.xml",
            suite: "unit"
        }

    });
};
