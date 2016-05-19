/**
 * Routing for the application
 * @param $routeProvider
 * @param $httpProvider
 */
config.routes = function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    config.routes.when($routeProvider, "login");
    config.routes.when($routeProvider, "home");

	$routeProvider.otherwise({
		redirectTo: "/home"
	});
};

/**
 * Tools to camel case string-formatted-like-this :)
 * @param input
 * @returns {string}
 */
config.routes.camel = function (input) {
	return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
		return group1.toUpperCase();
	});
};

/**
 * Helper to set basic when where the path, template and controller name matches
 * @param $routeProvider
 * @param name
 */
config.routes.when = function($routeProvider, name) {

	var controller;

	if (name.indexOf("-") !== -1) {
		controller = config.routes.camel(name);
	}

	$routeProvider.when("/" + name, {
		templateUrl: "partials/" + name + ".html",
		controller: controller || name
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
config.routes.$inject = ["$routeProvider", "$httpProvider"];
