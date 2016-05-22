/**
 * Abstract view controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param permissions {Object} permissions service
 * @param i18n {Object} i18n service
 * @param toasts {Object} i18n service
 * @param settings {Object} configuration
 */
controllers.abstract.view = function($scope, $rootScope, i18n, toasts, settings) {

	controllers.abstract.init($scope, i18n, settings);

	// query the item from the server
	settings.service.getById(settings.id).success(function(item) {
		$scope.item = item;
	}).error(function(err) {
		console.log(err);
	});

};
