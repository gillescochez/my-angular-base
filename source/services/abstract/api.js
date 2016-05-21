/**
 * Abstract API class which provides default API hookup
 * @param restful {Object} Restful service
 * @param path {String} Root path for the API
 * @param [extraParams] {Function} Used to add parameters to the requests
 * @returns {{getAll: getAll, getById: getById, add: add, save: save, remove: remove}}
 */
services.abstract.api = function(restful, path, extraParams) {

	if (!extraParams) {
		extraParams = function() {
			return {};
		};
	}

	return {

		/**
		 * Query the database for a list of entries
		 * @param [filters] Optional filters object
		 * @returns {*}
		 */
        getAll: function(filters) {
			return restful.query(path, angular.extend(filters ? {filters: filters} : {}, extraParams()));
		},

        /**
         * Query the database for a single entry
         * @param id
         * @returns {*}
         */
		getById: function(id) {
			return restful.query(path + "/" + id, extraParams());
		},

        /**
         * Do a POST request to the server
         * @param params
         * @returns {*}
         */
		add: function(params) {
			return restful.post(path, angular.extend(params, extraParams()));
		},

        /**
         * Do a PUT request to the server
         * @param id
         * @param params
         * @returns {*}
         */
		save: function(id, params) {
			return restful.put(path + "/" + id, angular.extend(params, extraParams()));
		},

        /**
         * Do a DELETE request to the server
         * @param id
         * @returns {*}
         */
        remove: function(id) {
            return restful.destroy(path + "/" + id, extraParams());
        }
	};
};
