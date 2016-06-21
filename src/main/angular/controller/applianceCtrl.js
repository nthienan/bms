/**
 * Created by nthienan on 15/06/2016.
 */
bms.controller('applianceCtrl', ['$scope', '$cookies', 'loginService', '$state', 'applianceService',
    function ($scope, $cookies, loginService, $state, applianceService) {

        $scope.getAll = function () {
            applianceService.getAll().then(
                function (response) {
                    $scope.appliances = response.data;
                }, function (error) {
                    console.log(error);
                });
        };

        if (!$cookies.get("access_token")) {
            var refreshToken = $cookies.get("refresh_token");
            if (refreshToken) {
                loginService.obtainAccessToken(refreshToken).then(
                    function () {
                        $scope.getAll();
                    });
            } else {
                $state.go('login');
            }
        } else {
            $scope.getAll();
        }

        $scope.create = function () {
            applianceService.create($scope.newAppliance).then(function (response) {
                $scope.newAppliance = undefined;
            });

        };
    }
]);