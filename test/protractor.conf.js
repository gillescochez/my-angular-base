exports.config = {

    allScriptsTimeout: 11000,

    rootElement: '#wrapper',

    specs: [
        "e2e/*.js",
        "e2e/*/*.js"
    ],

    capabilities: {
        browserName: "chrome"
    },

    baseUrl: "http://localhost:8000/",

    framework: "jasmine",

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};