/**
 * Login controller
 * @param $scope {Object} Angular scope
 * @param $location {Object} Angular location service
 * @param session {Object} session service
 */
controllers.login = function($scope, $location, session) {

    $scope.username = "";
    $scope.password = "";
    $scope.error = "";

    $scope.submit = function() {

        $scope.error = "";

        session.login($scope.username, $scope.password, function(success, error) {
            if (success) {
                $location.path("home");
            } else {
                $scope.error = error;
            }
        });

    };

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.login.$inject = ["$scope", "$location", "session"];