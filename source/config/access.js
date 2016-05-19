/**
 * Control the access permissions
 * @param $rootScope {Object} Angular root scope
 * @param $location {Object} Angular scope
 * @param session {Object} Session service
 */
config.access = function($rootScope, $location, session) {

	//$rootScope.$on("$locationChangeStart", function() {
    //
	//	if (!session.isLoggedIn()) {
	//		$location.path("/login");
	//	} else {
     //       $location.path("/member");
     //   }
	//});
};

/**
 * Dependencies
 * @type {string[]}
 */
config.access.$inject = ["$rootScope", "$location", "session"];
