controllers.abstract.create_edit = function($scope, $rootScope, i18n, toasts, settings) {

	$scope.save = {

		label: i18n.fetch("save"),

		handler: function() {

			var validation;

			if (settings.required) {

				validation = controllers.abstract.validate(settings.required, $scope.item, settings.validators);

				if (validation.failed) {
					$scope.errors = validation.errors;
					return;
				} else {
					$scope.errors = {};
				}
			}

			$scope.item.saving = true;

			($scope.item.id ? settings.service.save($scope.item.id, $scope.item) : settings.service.add($scope.item)).success(function(data) {

                toasts.success(i18n.fetch("edit_success"));

				$scope.item.saving = false;

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
};
