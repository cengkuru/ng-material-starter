angular.module('app.userService', [])
    .factory('userService', [ 'localStorageService', '$rootScope', 'Restangular', function (localStorageService, $rootScope, Restangular) {
        function checkIfLoggedIn() {
            return localStorageService.get('token');
        }

        function signup(name, email, password, onSuccess, onError) {

            $http.post('/api/auth/signup',
                {
                    name: name,
                    email: email,
                    password: password
                }).
            then(function (response) {

                localStorageService.set('token', response.data.token);
                onSuccess(response);

            }, function (response) {

                onError(response);

            });

        }

        function login(email, password, onSuccess, onError) {

            Restangular.all('authenticate')
                .post(
                    {
                        email: email,
                        password: password
                    })
                .then(
                    function (response) {
                        localStorageService.set('token', response.token);
                        onSuccess(response);
                    }, function (response) {

                        onError(response);

                    });

        }

        function logout() {

            localStorageService.remove('token');

        }

        function getCurrentToken() {
            return localStorageService.get('token');
        }

        function getAuthenticatedUser(onSuccess, onError){

            Restangular.one('authenticated_user').get().then(function(response){

                onSuccess(response.user);

            }, function(response){

                onError(response);

            });

        }

        return {
            checkIfLoggedIn: checkIfLoggedIn,
            signup: signup,
            login: login,
            logout: logout,
            getCurrentToken: getCurrentToken,
            getAuthenticatedUser:getAuthenticatedUser
        };

    }]);