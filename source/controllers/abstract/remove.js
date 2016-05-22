/**
 * Abstract view controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param i18n {Object} i18n service
 * @param toasts {Object} toasts service
 * @param settings {Object} configuration
 */
controllers.abstract.remove = function($scope, $rootScope, i18n, toasts, settings) {

	controllers.abstract.init($scope, i18n, settings);

	/**
	 * Confirmation settings
	 * @type {{message: *, accept: *, refuse: *, yes: yes, no: no}}
	 */
	$scope.confirmation = {
		message: i18n.fetch("confirm_remove"),
		accept: i18n.fetch("accept_remove"),
		refuse: i18n.fetch("refuse_remove"),
		yes: function() {
			settings.service.remove(settings.id).success(function() {

				toasts.success(i18n.fetch("remove_success"));

				if (!settings.noRedirect) {
					if (settings.modalInstance) {
						settings.modalInstance.close();
					} else {
						history.go(-1);
					}
				}

				if (settings.callback) {
					settings.callback();
				}

			}).error(function() {
				toasts.error(i18n.fetch("remove_error"));
			});
		},
		no: function() {
			history.go(-1);
		}
	};

	// query the item from the server
	settings.service.getById(settings.id).success(function(item) {
		$scope.item = item;
	}).error(function(err) {
		console.log(err);
	});

};
