/**
 * Main controller
 * @param $scope {Object} Angular scope
 * @param i18n {Object} i18n service
 * @param session {Object} Session service
 */
controllers.main = function($scope, i18n, session) {

    $scope.i18n = i18n.fetch;
    $scope.date = new Date();
    $scope.username = session.getUserName() || "";

    $scope.$on(constants.events.user.login, function() {
        $scope.username = session.getUserName();
    });

    $scope.logout = function() {
        session.logout();
        $scope.username = "";
    };

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.main.$inject = ["$scope", "i18n", "session"];