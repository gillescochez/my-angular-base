/**
 * Main controller
 * @param $scope {Object} Angular scope
 * @param i18n {Object} i18n service
 */
controllers.main = function($scope, i18n) {

    $scope.i18n = i18n.fetch;
    $scope.date = new Date();

};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.main.$inject = ["$scope", "i18n"];