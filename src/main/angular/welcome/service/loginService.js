/**
 * Created on 16/06/2016.
 * @author nthienan
 */
welcome.service('loginService', ['$http', '$httpParamSerializer', '$cookies', '$q',
    function ($http, $httpParamSerializer, $cookies, $q) {
        var clientCredential = 'bms:s3cr3t';
        var url = '/oauth/token';

        this.obtainAccessToken = function (refresh_token) {
            var defer = $q.defer();
            var params = {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            };
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'Authorization': 'Basic ' + btoa(clientCredential),
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                data: $httpParamSerializer(params)
            };
            $http(req).then(
                function (response) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                    var expireDate = new Date(new Date().getTime() + (1000 * response.data.expires_in));
                    $cookies.put('access_token', response.data.access_token, {'expires': expireDate});
                    $cookies.put('refresh_token', response.data.refresh_token);
                    defer.resolve(response.data);
                }, function (error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        };

        this.login = function (username, password) {
            var defer = $q.defer();
            var data = {
                grant_type: 'password',
                username: username,
                password: password
            };
            var req = {
                method: 'POST',
                url: url,
                headers: {
                    'Authorization': 'Basic ' + btoa(clientCredential),
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                data: $httpParamSerializer(data)
            };
            $http(req).then(function (response) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                var expireDate = new Date(new Date().getTime() + (1000 * response.data.expires_in));
                $cookies.put('access_token', response.data.access_token, {'expires': expireDate});
                $cookies.put('refresh_token', response.data.refresh_token);
                defer.resolve(response.data)
            });
            return defer.promise;
        };
    }]);