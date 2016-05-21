/**
 * RESTful service which provides API to communicate with the back end
 * @param $http {Object} Angular http object
 * @returns {{query: query}}
 */
services.restful = function($http) {

    var domain = config.app.getServerUrl() + "/";

	/**
	 * GET Query to the server
	 * @param path {String}
	 * @param attributes {Object}
	 * @param [method] {Object}
	 */
	function query(path, attributes, method) {

		return $http({
			url: domain + path,
			params: attributes,
			method: method || "GET",
			widthCredentials: true
		});
	}

    /**
     * Make a request containing files to upload
     * @param path {String}
     * @param attributes {Object}
     * @param [method] {String}
     * @returns {*}
     */
    function upload(path, attributes, method) {
        return $http({
            url: domain + path,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: attributes,
            method: method || "POST",
            widthCredentials: true,
            transformRequest: function(data, headersGetter) {

                var formData = new FormData();
                var headers = headersGetter();

                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                delete headers['Content-Type'];

                return formData;
            }
        });
    }

    /**
     * Public API
     */
    return {
        postAndUpload: function(path, attributes) {
            return upload(path, attributes);
        },
        putAndUpload: function(path, attributes) {
            return upload(path, attributes, "PUT");
        },
		query: query,
		destroy: function(path, attributes) {
            return query(path, attributes, "DELETE");
        },
		post: function(path, attributes) {
            return query(path, attributes, "POST");
        },
        put:  function(path, attributes) {
            return query(path, attributes, "PUT");
        }
    };

};

/**
 * Dependencies
 * @type {string[]}
 */
services.restful.$inject = ["$http"];
