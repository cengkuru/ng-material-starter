angular.module('StarterApp',
    [
        'ui.router',
        'ngMaterial',
        'angular-loading-bar',
        'restangular',
        'ngMdIcons',
        'toastr',
        'app.authservice',
        'app.userService',
        'app.MainCtrl',
        'app.HomeCtrl',
        'app.LoginCtrl'
    ])
    // loading defaults
    .run(['$rootScope', '$state','$location','$stateParams','userService', function ($rootScope, $state,  $location,$stateParams,userService) {

        $rootScope.previousState = '';

        $rootScope.currentState ='';

        $rootScope.isAuthenticated=userService.checkIfLoggedIn();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            $rootScope.returnToStateParams = fromParams.id;

            console.log('current state: '+$rootScope.currentState);

        });


        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            console.log(error);

        });

    }
    ])
    .config(['cfpLoadingBarProvider','$stateProvider','$urlMatcherFactoryProvider','$urlRouterProvider','RestangularProvider','toastrConfig','$mdThemingProvider',function (cfpLoadingBarProvider,$stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider,RestangularProvider,toastrConfig,$mdThemingProvider) {

        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');

        // Default Toast configs
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });

        // Instantiate loading bat
        cfpLoadingBarProvider.includeSpinner = true;
        // Case insensitive urls
        $urlMatcherFactoryProvider.caseInsensitive(true);
        // Set app BASEURL (to the backend or api)
        // TODO CHANGE THIS DEPENDING ON THE ENVIRONMENT
        var appurl='';
        RestangularProvider.setBaseUrl(appurl);
        RestangularProvider.addResponseInterceptor(function(data, operation) {
            var extractedData;

            if (operation === "getList") {
                extractedData = data.data;
            } else {
                extractedData = data;
            }
            return extractedData;
        });

        //case insensitive urls
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $stateProvider
            .state({
                name: 'main',
                abstract: true,
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })

            // Welcome
            .state({
                name: 'main.home',
                title: 'Home',
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })


            // Login
            .state({
                name: 'main.login',
                title: 'Login',
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })

            // 404
            .state({
                name: 'main.404',
                title: '404',
                url: '/404',
                templateUrl: 'views/404.html'
            });

        //configure default route
        $urlRouterProvider.otherwise('/404');

    }]);

