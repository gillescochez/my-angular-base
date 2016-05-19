/**
 * App configuration API creation
 * @type {{name, server, modules, getServerUrl}}
 */
config.app = (function() {

	/**
	 * Application internal name
	 * @type {string}
	 */
	var name = "app";

	/**
	 * Application module dependencies
	 * @type {String[]}
	 */
	var modules = [
		"ngRoute",
		"ngCookies",
		"ui.bootstrap",
		name + ".controllers",
		name + ".directives",
		name + ".services",
		name + ".filters"
	];

	/**
	 * Back end server configuration for restful and web socket connection
	 * @type {{protocol: string, domain: string, port: string}}
	 */
	var server = {
		protocol: "http",
		domain: "localhost",
		port: "1337"
	};

	/**
	 * Public API
	 */
	return {
		name: name,
		server: server,
		modules: modules,
		getServerUrl: function() {
			return (server.protocol ? server.protocol : "http") + "://" + server.domain + (server.port ? ":" + server.port : "")
		}
	};

})();
