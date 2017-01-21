/**
 * Created by GADGETS 0752423205 on 12/23/2016.
 */
angular.module('app.authservice', ['LocalStorageModule'])

    //AuthService (handle Registration, login and and logout)
    .factory('authService', ['localStorageService', function (localStorageService) {
        // Methods container
        var svc = {};
        // Checks if a token is actually present or not
        svc.checkIfLoggedIn = function () {
            if (localStorageService.get('token'))
                return true;
            else
                return false;

        };

        // Delete the stored token;
        svc.logout = function () {
            localStorageService.remove('token');
        };

        svc.getCurrentToken = function () {
            return localStorageService.get('token');
        };

        return svc;
    }]);

