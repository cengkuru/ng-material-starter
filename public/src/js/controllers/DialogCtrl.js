angular.module('app.DialogCtrl', [])
    .controller("DialogCtrl", ['$scope', '$rootScope', '$state','$mdDialog', function ($scope, $rootScope, $state,$mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }]);
