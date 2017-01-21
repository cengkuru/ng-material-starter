angular.module('app.HomeCtrl', [])
    .controller("HomeCtrl", ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

        // Mock activity
        $scope.activity = [{
            what: 'Brunch this weekend?',
            who: 'Ali Conners',
            avatar: 'svg-1',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            what: 'Summer BBQ',
            who: 'to Alex, Scott, Jennifer',
            avatar: 'svg-2',
            when: '3:08PM',
            notes: "Wish I could come out but I'm out of town this weekend"
        }, {
            what: 'Oui Oui',
            who: 'Sandra Adams',
            avatar: 'svg-3',
            when: '3:08PM',
            notes: "Do you have Paris recommendations? Have you ever been?"
        }, {
            what: 'Birthday Gift',
            who: 'Trevor Hansen',
            avatar: 'svg-4',
            when: '3:08PM',
            notes: "Have any ideas of what we should get Heidi for her birthday?"
        }, {
            what: 'Recipe to try',
            who: 'Brian Holt',
            avatar: 'svg-5',
            when: '3:08PM',
            notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
        } ];

    }]);
