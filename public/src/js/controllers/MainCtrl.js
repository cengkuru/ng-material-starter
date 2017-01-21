angular.module('app.MainCtrl', [])
    .controller('MainCtrl', ['$scope', '$location', '$state', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$timeout', 'authService', '$log', '$interval', 'userService',  function ($scope, $location, $state, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, $timeout, authService, $log, $interval, userService) {
        // Logout
        $scope.logout = function () {
            userService.logout();
            $rootScope.isAuthenticated=null;
            $state.go('main.login');
        };
        $scope.refresh = function () {
            $scope.currentToken = userService.getCurrentToken();

            // Add any scope variable that needs to be periodically updated

        };

        $scope.currentToken='';
        $scope.refresh();

        // Toolbar search toggle
        $scope.toggleSearch = function(element) {
            $scope.showSearch = !$scope.showSearch;
        };

        // Sidenav toggle
        $scope.toggleSidenav = function(menuId) {

            $mdSidenav(menuId).toggle();
            if(menuId == 'left')
                $scope.openInfo = !$scope.openInfo;
        };

        // Menu items
        $scope.menu = [{
            link: '',
            title: 'Dashboard',
            icon: 'dashboard'
        }, {
            link: '',
            title: 'Friends',
            icon:'people'
        }, {
            link: '',
            title: 'Messages',
            icon:'mail'
        }];
        $scope.admin = [{
            link: '',
            title: 'Trash',
            icon: 'delete'
        }, {
            link: 'showListBottomSheet($event)',
            title: 'Settings',
            icon:'settings'
        }];


        // Bottomsheet & Modal Dialogs
        $scope.alert = '';

        $scope.items = [
            { name: 'Share', icon: 'social:ic_share_24px' },
            { name: 'Upload', icon: 'file:ic_cloud_upload_24px' },
            { name: 'Copy', icon: 'content:ic_content_copy_24px' },
            { name: 'Print this page', icon: 'action:ic_print_24px' },
        ];


        $scope.listItemClick = function($index) {
            var clickedItem = $scope.items[$index];
            $mdBottomSheet.hide(clickedItem);
        };
        $scope.showListBottomSheet = function($event) {
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'views/partials/bottomSheet.html',
                controller: 'MainCtrl',
                targetEvent: $event
            }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
            });
        };

        $scope.customFullscreen = false;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.showAdd = function(ev) {
            $mdDialog.show({
                    controller: 'MainCtrl',
                    templateUrl: 'views/partials/newUser.html',
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        };

    }]);
