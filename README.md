# My Angular Base

Angular.js base application to help speed up the development of SPAs

## Command lines

### Installing

```npm install``` to install dependencies

```grunt``` to compile and setup the app

```npm start``` to start the application

Then access the app at [http://localhost:8000/app](http://localhost:8000/app)

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

It will be automatically added to the application services module.

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