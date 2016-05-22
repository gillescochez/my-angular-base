/**
 * Abstract edit controller use to display a single entry
 * @param $scope {Object} angular scope
 * @param $rootScope {Object} angular scope
 * @param i18n {Object} i18n service
 * @param toasts {Object} toasts service
 * @param settings {Object} configuration
 */
controllers.abstract.edit = function($scope, $rootScope, i18n, toasts, settings) {

	controllers.abstract.init($scope, i18n, settings);

	/**
	 * Save action
	 */
	$scope.save = {

		label: i18n.fetch("save"),

		handler: function() {

			if (settings.required) {

				var validation = controllers.abstract.validate(settings.required, $scope.item, settings.validators);

				if (validation.errors) {
					$scope.errors = validation.errors;
					return;
				} else {
					$scope.errors = {};
				}

			}

			settings.service.save(settings.id, $scope.item).success(function(data) {

				toasts.success(i18n.fetch("edit_success"));

				if (!settings.noRedirect) {
					if (settings.modalInstance) {
						settings.modalInstance.close(data);
					} else {
						history.go(-1);
					}
				}

				if (settings.callback) {
					settings.callback(data);
				}

			}).error(function() {
				toasts.error(i18n.fetch("edit_error"));
			});

		}
	};

	// query the item from the server
	settings.service.getById(settings.id).success(function(item) {
		$scope.item = item;
		settings.onload && settings.onload(item);
	}).error(function(err) {
		console.log(err);
	});

	if ($scope.types) {
		processTypes($scope.types);
	}

	if (settings.defaults) {
		processDefaults(settings.defaults);
	}

	function processDefaults(defaults) {

		var key;

		for (key in defaults) {
			$scope.item[key] = defaults[key];
		}
	}

	function processTypes(types) {

		var key;

		for (key in types) {
			if (types[key].provider) {
				loadSelectOptions(types[key], key);
			}
		}
	}

	function loadSelectOptions(type, key) {
		type.provider.getAll().success(function(items) {
			$scope.types[key].options = controllers.abstract.convertToOption(items);
		}).error(console.error);
	}

};
