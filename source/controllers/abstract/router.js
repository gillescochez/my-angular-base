/**
 *
 * @param $scope
 * @param $rootScope
 * @param i18n
 * @param toasts
 * @param api
 */
controllers.abstract.router = function($scope, $rootScope, i18n, toasts, api) {

	var settings = {
		service: api.service,
		serviceMethod: api.serviceMethod,
		serviceId: api.serviceId,
		required: api.required,
		directives: api.directives || "",
		validators: api.validators,
		name: api.name,
		parent: api.parent,
		modalInstance: api.modalInstance,
		noRedirect: api.noRedirect,
		callback: api.callback,
		onload: api.onload,
		fields: api.fields.edit,
		defaults: api.defaults,
		types: api.types,
		id: api.id
	};

	if (api.id || api.action === "create") {

		if (controllers.abstract[api.action]) {

			if (api.action === "create") {
				settings.fields = api.fields.create;
			}

			controllers.abstract[api.action]($scope, $rootScope, i18n, toasts, settings);

		} else {
			// TODO redirect and throw BAD_REQUEST flash message
		}

	} else {

		settings.fields = api.fields.list;

		// simply list the items
		controllers.abstract.list($scope, $rootScope, i18n, toasts, settings);
	}

};
