/**
 * RESTful service which provides API to communicate with the back end
 * @param $http {Object} Angular http object
 * @returns {{query: query}}
 */
services.restful = function($http) {

    var domain = config.app.getServerUrl() + "/api/";

	/**
	 * GET Query to the server
	 * @param path {String}
	 * @param attributes {Object}
	 */
	function query(path, attributes) {

		return $http({
			url: domain + path,
			params: attributes,
			method: "GET",
			widthCredentials: true
		});
	}

	/**
	 * POST Query the server
	 * @param path {String}
	 * @param attributes {Object}
	 */
	function post(path, attributes) {
		return $http({
			url: domain + path,
			data: attributes,
			method: "POST",
			widthCredentials: true
		});
	}

    /**
     * Public API
     */
    return {
		query: query,
		post: post
    };

};

/**
 * Dependencies
 * @type {string[]}
 */
services.restful.$inject = ["$http"];
