/**
 * Attach filters to the filters module
 */
(function(mod, name) {

	for (name in filters) {
		if (name !== "abstract") {
			mod.filter(name, filters[name]);
		}
	}

})(angular.module(config.app.name + ".filters", []));
