module.exports = function(grunt) {

    var sources = [
        "source/build/intro.js",
        "source/namespace.js",
        "source/constants.js",
        "source/config/*.js",
        "source/controllers/*/*.js",
        "source/controllers/*.js",
        "source/directives/*/*.js",
        "source/directives/*.js",
        "source/locales/*.js",
        "source/services/*/*.js",
        "source/services/*.js",
        "source/filters/*/*.js",
        "source/filters/*.js",
        "source/app/*.js",
        "source/build/outro.js"
    ];

    var dependencies = {
        fonts: ["dependencies/bootstrap/dist/fonts/*.*"],
        css: ["dependencies/bootstrap/dist/css/bootstrap.min.css"],
        js: [
            "dependencies/angular/angular.min.js",
            "dependencies/angular-cookies/angular-cookies.min.js",
            "dependencies/angular-loader/angular-loader.min.js",
            "dependencies/angular-mocks/angular-mocks.js",
            "dependencies/angular-route/angular-route.min.js",
            "dependencies/angular-ui-bootstrap-bower/ui-bootstrap.min.js",
            "dependencies/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js"
        ]
    };

    var appPath = "app/";
    var dependenciesPath = appPath + "dependencies/";

    var docSources = sources.slice(1, -1);
    docSources.push("./README.md");

    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            build: {
                src: sources,
                dest: "app.src.js"
            }
        },
        uglify: {
            app: {
                src: ["app.src.js"],
                dest: appPath + "app.js"
            },
            dependencies: {
                src: dependencies.js,
                dest: dependenciesPath + "js/all.js"
            }
        },
        copy: {
            fonts: {
                expand: true,
                src: dependencies.fonts,
                dest: dependenciesPath + "fonts/",
                flatten: true,
                filter: "isFile"
            },
            css: {
                expand: true,
                src: dependencies.css,
                dest: dependenciesPath + "css/",
                flatten: true,
                filter: "isFile"
            }
        },
		jsdoc: {
			dist: {
				src: docSources,
				options: {
					destination: "documentation"
				}
			}
		},
        clean: ["app.src.js"],
        watch: {
            app: {
                files: sources,
                tasks: ["concat", "uglify:app", "clean"]
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-jsdoc");

    // Default task(s).
    grunt.registerTask("default", ["concat", "uglify", "copy", "clean"]);
    grunt.registerTask("doc", "jsdoc");
};
