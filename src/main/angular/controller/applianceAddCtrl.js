/**
 * Created on 15/06/2016.
 * @author nthienan
 */
bms.controller('applianceAddCtrl', ['$scope', 'applianceService', '$log', '$mdDialog',
    function ($scope, applianceService, $log, $mdDialog) {
        $scope.cancel = $mdDialog.cancel;

        $scope.create = function () {
            $scope.item.form.$setSubmitted();
            if ($scope.item.form.$valid) {
                applianceService.create($scope.appliance).then(function (response) {
                    $mdDialog.hide(response.data);
                });
            }
        };
    }
]);