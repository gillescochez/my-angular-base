/**
 * Toast service used to broadcast message to the user via the Toasts UI
 * @param $rootScope {Object} angular root scope
 */
services.toasts = function($rootScope) {

	function broadcast(type, message) {
		$rootScope.$broadcast("toast", {
			type: type,
			message: message
		});
	}

	return {
		info: function(message) {
            broadcast("info", message);
		},
		success: function(message) {
            broadcast("success", message);
		},
		warning: function(message) {
            broadcast("warning", message);
		},
		error: function(message) {
            broadcast("danger", message);
		}
	}
};

/**
 * Dependencies
 * @type {string[]}
 */
services.toasts.$inject = ["$rootScope"];