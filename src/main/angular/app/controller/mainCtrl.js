/**
 * Created on 15/06/2016.
 * @author nthienan
 */
bms.controller('mainCtrl', ['$rootScope', '$scope', 'oauthService', '$window', 'userService',
    function ($rootScope, $scope, oauthService, $window, userService) {
        userService.getAuthenticatedUser().then(function (user) {
            $rootScope.loggedUser = user;
        });

        $scope.logout = function () {
            oauthService.logout().then(function () {
                $window.location.href = '/welcome.html';
            });
        };
    }
]);