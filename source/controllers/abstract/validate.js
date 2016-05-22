/**
 * Abstract validator
 * @param fields {Array} field name list
 * @param item {Object} object tp validate
 * @param [customs] {Object} Custom validators
 * @returns {{errors: {}}}
 */
controllers.abstract.validate = function(fields, item, customs) {

	var validation = {
		errors: {},
		failed: false
	};

	fields.forEach(function(field) {

		if (item[field] === undefined || item[field] === null || item[field] === "") {

			validation.errors[field] = "required";
			validation.failed = true;
		}

		if (customs && customs[field]) {

			var errorMsg = customs[field](item[field], item);

			if (errorMsg) {
				validation.errors[field] = errorMsg;
				validation.failed = true;
			}
		}

	});

	return validation;
};
