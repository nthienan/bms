/**
 * Created by nthienan on 15/06/2016.
 */
bms.controller('loginCtrl', ['$scope', '$cookies', '$state', 'loginService',
    function ($scope, $cookies, $state, loginService) {

        $scope.login = function () {
            loginService.login($scope.username, $scope.password).then(function () {
                $state.go('appliance');
            });
        };

        var isLoginPage = window.location.href.indexOf("login") != -1;
        if (isLoginPage) {
            if ($cookies.get("access_token")) {
                $state.go('appliance');
            }
        }
    }]);