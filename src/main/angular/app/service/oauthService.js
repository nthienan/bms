/**
 * Created by nthienan on 30/06/2016.
 */
bms.service("oauthService", ['$http', '$httpParamSerializer', '$q', '$cookies',
    function ($http, $httpParamSerializer, $q, $cookies) {
        var url = '/oauth';

        this.logout = function () {
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: url + '/logout'
            };
            $http(req).then(function (response) {
                $cookies.remove('access_token');
                $cookies.remove('refresh_token');
                $cookies.remove('logged_user');
                defer.resolve(response);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        };
    }]);