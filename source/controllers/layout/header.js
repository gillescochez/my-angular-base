controllers.header = function($scope, session) {

    $scope.username = session.getUserName() || "";

    $scope.$on(constants.events.user.login, function() {
        $scope.username = session.getUserName();
    });

    $scope.logout = function() {
        session.logout();
        $scope.username = "";
    };
};