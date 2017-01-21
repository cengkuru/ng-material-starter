angular.module('app.LoginCtrl',[])
    .controller('LoginCtrl', ['$scope', '$state','userService','$mdToast','$rootScope','toastr',function($scope, $state,userService,$mdToast,$rootScope,toastr) {
        $scope.loginData = {};
        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            userService.login(
                $scope.loginData.email, $scope.loginData.password,
                function(response){
                    $rootScope.isAuthenticated=true;
                    toastr.success('Welcome');
                    $state.go('main.home');
                },
                function(response){
                    toastr.error('Something went wrong with the login process. Try again later!');
                }
            );
        };

        if(userService.checkIfLoggedIn())
            $state.go('main.home');

    }]);
