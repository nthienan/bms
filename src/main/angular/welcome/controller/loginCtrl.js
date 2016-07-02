/**
 * Created by nthienan on 15/06/2016.
 */
welcome.controller('loginCtrl', ['$scope', '$cookies', '$window', 'loginService',
    function ($scope, $cookies, $window, loginService) {

        $scope.login = function () {
            loginService.login($scope.username, $scope.password).then(function () {
                $window.location.href = '/';
            });
        };

        var isLoginPage = window.location.href.indexOf("login") != -1;
        if (isLoginPage) {
            if ($cookies.get("access_token")) {
                $window.location.href = '/';
            }
        }
    }]);