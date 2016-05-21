/**
 * Converts boolean value into user friendly i18n strings
 * @class filters.friendlyBoolean
 * @param i18n {Object} i18n service
 * @returns {Function}
 */
filters.friendlyBoolean = function(i18n) {

	return function(input) {

		var output = input || "";

		if (input === "true" || input === true) {
			output = i18n.fetch("yes");
		}

		if (input === "false" || input === false) {
			output = i18n.fetch("no");
		}

		return output;
	}

};

/**
 * Dependencies
 * @memberof filters.friendlyBoolean
 * @type {string[]}
 */
filters.friendlyBoolean.$inject = ["i18n"];
