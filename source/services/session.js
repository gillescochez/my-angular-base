/**
 * Session service in charge of login/logout and other user session settings
 * @param restful {Object} RESTful service
 * @param $rootScope {Object} Angular $rootScope
 * @param $cookieStore {Object} Angular $cookieStore
 * @returns {{isLoggedIn: Function, getAuthToken: Function, getUserName: Function, login: Function, logout: Function}}
 */
services.session = function(restful, $rootScope, $cookieStore) {

    var cookie = $cookieStore.get("user") || {};
    var user = {
        loggedIn: cookie.loggedIn || false,
        token: cookie.token || "",
        name: cookie.name || ""
    };

    return {

        /**
         * Return the login state
         * @returns {boolean}
         */
        isLoggedIn: function() {
            return user.loggedIn;
        },

        /**
         * Return the authentication token
         * @returns {string}
         */
        getAuthToken: function() {
            return user.token;
        },

        getUserName: function() {
            return user.name;
        },

        /**
         * Use the RESTful API to log the user and execute a callback on completion
         * @param username {String}
         * @param password {String}
         * @param callback {Function}
         */
        login: function(username, password, callback) {

            if (username === "admin" && password === "admin") {

                user.token = "12345";
                user.loggedIn = true;
                user.name = username;

                $cookieStore.put("user", user);
                $rootScope.$broadcast(constants.events.user.login);

                callback(true);

            } else {
                callback(false, "Wrong Username/Password");
            }
        },

        /**
         * Log out the user
         */
        logout: function() {

            user = {
                loggedIn: false,
                token: "",
                name: ""
            };

            $cookieStore.put("user", user);

            $rootScope.$broadcast(constants.events.user.logout);
        }
    }

};

/**
 * Dependencies
 * @type {string[]}
 */
services.session.$inject = ["restful", "$rootScope", "$cookieStore"];