module.exports = function(grunt) {

    var sources = [
        "source/build/intro.js",
        "source/phoenix-elixir-es5.js",
        "source/namespace.js",
        "source/constants.js",
        "source/config/*.js",
        "source/controllers/abstract/*.js",
        "source/controllers/layout/*.js",
        "source/controllers/widgets/*.js",
        "source/controllers/*.js",
        "source/directives/*.js",
        "source/locales/*.js",
        "source/services/abstract/*.js",
        "source/services/*.js",
        "source/filters/*.js",
        "source/app/*.js",
        "source/build/outro.js"
    ];

	var docSources = [
		"./source/namespace.js",
		"./source/constants.js",
		"./source/config/*.js",
		"./source/controllers/abstract/*.js",
		"./source/controllers/layout/*.js",
		"./source/controllers/widgets/*.js",
		"./source/controllers/*.js",
		"./source/directives/*.js",
		"./source/locales/*.js",
		"./source/services/abstract/*.js",
		"./source/services/*.js",
		"./source/filters/*.js",
		"./source/app/*.js",
		"README.md"
	];

    var dependencies = [
        "dependencies/bootstrap/dist/css/bootstrap.min.css",
        "dependencies/bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
        "dependencies/bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
        "dependencies/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
        "dependencies/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
        "dependencies/d3/d3.min.js",
        "dependencies/angular/angular.min.js",
        "dependencies/angular/angular.min.js.map",
        "dependencies/angular-cookies/angular-cookies.min.js",
        "dependencies/angular-cookies/angular-cookies.min.js.map",
        "dependencies/angular-loader/angular-loader.min.js",
        "dependencies/angular-loader/angular-loader.min.js.map",
        "dependencies/angular-mocks/angular-mocks.js",
        "dependencies/angular-route/angular-route.min.js",
        "dependencies/angular-route/angular-route.min.js.map",
        "dependencies/angular-ui-bootstrap-bower/ui-bootstrap.min.js",
        "dependencies/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js"
    ];

    var dependencies_dest = "app/";

    var src = "dist/app.src.js";
    var min = "dist/app.min.js";
    var app = "app/app.js";

    var tasks = ["concat", "uglify", "copy", "clean"];

    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            build: {
                src: sources,
                dest: src
            }
        },
        uglify: {
            build: {
                src: [src],
                dest: min
            }
        },
        watch: {
            scripts: {
                files: sources,
                tasks: tasks
            }
        },
        copy: {
            main: {
                src: [min],
                dest: app
            },
            dependencies: {
                src: dependencies,
                dest: dependencies_dest
            }
        },
		jsdoc : {
			dist : {
				src: docSources,
				options: {
					destination: "documentation",
					template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
					configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
		},
        clean: ["dist"]
    });
    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-jsdoc");

    // Default task(s).
    grunt.registerTask("default", tasks);
    grunt.registerTask("doc", "jsdoc");
};
