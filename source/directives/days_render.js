/**
 * Basic directive to render list of days
 * @returns {{restrict: string, link: Function}}
 */
directives.daysRender = function() {

	return {
		restrict: "A",
		link: function(scope, element, attrs) {

			var config = {};
			var html = [];
			var key;

			try {
				config = JSON.parse(attrs.daysRender);
			} catch(e) {

			}

			for (key in config) {
				html.push("<span class=\"text-capitalize\">" + key + "</span>");
			}

			element.html(html.join(", "));

		}
	}

};