angular.module('app.toastService', ['ngMaterial'])
    // Toasts service
    .factory('toastService', function ($mdToast) {
        var delay = 6000,
            position = 'bottom left',
            action = 'OK';

        return {
            show: function (content) {
                return $mdToast.show(
                    $mdToast.simple()
                        .content(content)
                        .position(position)
                        .action(action)
                        .hideDelay(delay)
                );
            }
        };
    });
