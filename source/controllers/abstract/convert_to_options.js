/**
 * Normalise the items into data ready to be handled by the template engine.
 * @param items
 * @returns {Object[]}
 */
controllers.abstract.convertToOption = function(items) {

	var res = [];

	items.forEach(function(item) {

		var response = {
			label: item.title || item.name || 'not found',
			value: item.id
		};

		if (item.level) {
			response.level = item.level;
		}

		res.push(response);
	});

	return res;
};
