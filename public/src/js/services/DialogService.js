/**
 * Created by GADGETS 0752423205 on 12/23/2016.
 */
/**
 * Created by GADGETS 0752423205 on 12/23/2016.
 */
angular.module('app.dialogervice', ['LocalStorageModule'])

    // Dialogues service
    .factory('dialogService', function ($mdDialog) {

        return {
            fromTemplate: function (template, $scope) {

                var options = {
                    templateUrl: '/views/dialogs/' + template + '/' + template + '.html'
                };

                if ($scope) {
                    options.scope = $scope.$new();
                }

                return $mdDialog.show(options);
            },

            hide: function () {
                return $mdDialog.hide();
            },

            alert: function (title, content) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .title(title)
                        .content(content)
                        .ok('Ok')
                );
            }
        };
    });
