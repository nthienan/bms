/**
 * Created on 15/06/2016.
 * @author nthienan
 */
bms.controller('applianceEditCtrl', ['$scope', 'applianceService', '$log', '$mdDialog', 'appliance',
    function ($scope, applianceService, $log, $mdDialog, appliance) {
        $scope.appliance = appliance;
        $scope.cancel = $mdDialog.cancel;

        $scope.update = function () {
            $scope.item.form.$setSubmitted();
            if ($scope.item.form.$valid) {
                applianceService.update($scope.appliance).then(function (response) {
                    $mdDialog.hide(response.data);
                });
            }
        };
    }
]);