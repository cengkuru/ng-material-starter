/**
 * Created by Cengkuru on 8/29/2016.
 */

angular.module('app.routes', [])
.config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
        //case insensitive urls
        $urlMatcherFactoryProvider.caseInsensitive(true);


        //configure default route
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state({
                name: 'main',
                abstract: true,
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            })
            
            //welcome
            .state({
                name: 'main.home',
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
            })

           

    });