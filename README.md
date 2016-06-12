# My Angular Base

Angular.js base application to help speed up the development of SPAs

## Command lines

### Running the application

```npm start``` dependencies will be installed and the app will be build before the http server starts

### Installing

```npm install``` to install dependencies

```grunt``` to compile and setup the app

```npm start``` to start the application

Then access the app at [http://localhost:8000](http://localhost:8000)

### Testing 

```npm test``` to run the unit test suite

```npm run test-single-run``` to run the unit tests once

To run the E2E test suite the application must be running locally using ```npm start```

```npm run protractor``` to run the E2E test suite

### Developing

Run and keep open the following commands when developing

```grunt watch``` and ```npm test```

### Documentation

```grunt doc``` to generate the documentation

## Adding services, controllers, directives and filters

Services, controllers, directives and filters are all declared as properties of global variables named after them.
Code inside /source/app will look over the global variables and set each item in angular properly.

The idea is to reduce the amount of code required to add those items to angular, for example we could add a controller 
by simply adding a new file in /source/controllers with the following and nothing more.

```javascript

controllers.myController = function() {};

```

It will be automatically added to the application controllers module.

## Abstract Helper for services

`services.abstract.api` can be use to create a base API to any service interacting with a RESTful back-end.

For example let's create a users service

```javascript

services.users = function(restful) {
	return services.abstract.api(restful, "users");
};

services.users.$inject = ["restful"];

```

The users service now have `getAll`, `getById`, `add`, `save` and `remove` methods available and ready to use.

## Abstract Helpers for controllers

In /source/controllers/abstract there are many files that can be use to create new CMS section quickly. Only one controller
need to be set in order to handle listing entries, viewing entry, editing, creating and removing of entries.

This system also support checking for required fields, hidden fields, custom validation methods, editing inside a modal,
various field type, displaying select option based on provided list or via service and so on. 

The example below will set basic tools in order to manage a list of users.
The routing can be set using `config.routes.api` helper found in /source/config/routes.php.

```javascript

controllers.users = function($scope, $rootScope, $location, $routeParams, i18n, toasts, users) {

	controllers.abstract.router($scope, $rootScope, i18n, toasts, {
		name: "users",
		service: users,
		id: $routeParams.id,
		action: controllers.abstract.getAction($location.path()),
		fields: {
			edit: ["username", "user_type"],
			create: ["username", "password", "user_type"],
			list: ["username", "user_type"]
		},
		types: {
			user_type: {
				value: "select",
				options: {
					"1": i18n.fetch("admin"),
					"2": i18n.fetch("moderator"),
					"3": i18n.fetch("user")
				}
			}
		}
	});
};


```

Here is the list of properties that can be passed to the router.

```javascript

{
	service: Object, // Service respecting API from services.abstract.api
	serviceMethod: String, // Can be used to specify a method to use for fetching data
	serviceId: Integer, // ID that is passed to the method used for listing items
	required: Array, // Array of fields that are required
	directives: String, // Comma separated list of directives to load (works with abstract_loader)
	validators: Object, // Object containing custom fields validator
	name: String, // Name/Ref of the section, generally same as service name used for path
	parent: String, // Also used for path, allow for things like /admin/users and so on
	modalInstance: Object, // Modal instance the edit/create form is loaded into (will be closed on save)
	noRedirect: Boolean, // Redirect after save or not
	callback: Function, // Function to execute when  an action is completed
	onload: Function, // Function to execute when loading is finished
	fields: Object, // Object providing the fields necessary for each action
	defaults: Object, // Default values to use with fields
	types: Object, // Provide list of items for multi selection fields
	id: Integer // ID of the entry being edited
};
	
```


## Toasts Service

Basic toasts implementation to pass on messages to the user. Bootstrap alert styling used.
API consist of 4 methods `info`, `success`, `warning` and `error`. Use from anywhere like below.

```javascript

controllers.myController = function($scope, toasts) {
	$scope.toastIt = function(message) {
		toasts.info(message);
	};
};

controllers.myController.$inject = ["$scope", "toasts"];

```