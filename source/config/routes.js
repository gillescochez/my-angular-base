/**
 * Routing for the application
 * @param $routeProvider
 * @param $httpProvider
 */
config.routes = function($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    config.routes.when($routeProvider, "login");
    config.routes.when($routeProvider, "home");

    config.routes.api($routeProvider, "blog");

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
 * Set API routing for a given name
 * @param $routeProvider {Object} Angular route provider
 * @param name {String}
 * @param [path] {String} Used if the path doesn't match the name
 * @param [partials] {Object} Map of partial to override defaults
 */
config.routes.api = function($routeProvider, name, path, partials) {

    var templates = {
        list: "partials/section/list.html",
        view: "partials/section/view.html",
        edit: "partials/section/edit.html",
        create: "partials/section/edit.html",
        remove: "partials/section/remove.html"
    };

    var controller;

    if (name.indexOf("-") !== -1) {
        controller = config.routes.camel(name);
    } else {
        controller = name;
    }

    if (!path) {
        path = name;
    }

    angular.extend(templates, partials);

    $routeProvider.when("/" + path, {
        templateUrl: templates.list,
        controller: controller
    });

    $routeProvider.when("/" + path + "/view/:id", {
        templateUrl: templates.view,
        controller: controller
    });

    $routeProvider.when("/" + path + "/edit/:id", {
        templateUrl: templates.edit,
        controller: controller
    });

    $routeProvider.when("/" + path + "/create", {
        templateUrl: templates.create,
        controller: controller
    });

    $routeProvider.when("/" + path + "/remove/:id", {
        templateUrl: templates.remove,
        controller: controller
    });
};

/**
 * Dependencies
 * @type {string[]}
 */
config.routes.$inject = ["$routeProvider", "$httpProvider"];
