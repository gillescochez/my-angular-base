/**
 * Simple directive to load directive dynamically
 * @param $compile
 * @returns {{link: Function}}
 */
directives.abstractLoader = function($compile) {

	return {

		link: function(scope, element, attrs) {

			attrs.$observe("abstractLoader", function(value) {

				var directives = (value || "").split(",");
				var length = directives.length;
                var html = "";
				var i = 0;
                var tag;

				if (directives[i] !== "") {

					for (; i < length; i++) {
						tag = directives[i].replace(/^\s+|\s+$/g, '');
                        html += "<" + tag + "></" + tag + ">";
					}

					element.append($compile(html)(scope));
				}
			});
		}
	}
};

/**
 * Dependencies
 * @type {string[]}
 */
directives.abstractLoader.$inject = ["$compile"];