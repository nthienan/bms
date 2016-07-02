/**
 * Created by nthienan on 27/06/2016.
 */
bms.service("userService", ['$http', '$httpParamSerializer', '$q', '$cookies',
    function ($http, $httpParamSerializer, $q, $cookies) {

        var url = '/api/users';

        this.getById = function (userId) {
            var req = {
                method: 'GET',
                url: url + '/' + userId
            };
            return $http(req);
        };

        this.search = function (query) {
            var defer = $q.defer();
            if (query) {
                var req = {
                    method: 'GET',
                    url: url + '/search?' + $httpParamSerializer({query: query})
                };
                $http(req).then(function (response) {
                    response.data.forEach(function (user) {
                       user['image'] = user['image'] ? user['image'] : '/img/avatar.png';
                    });
                    defer.resolve(response);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            }
        };

        this.getAuthenticatedUser = function () {
            var defer = $q.defer();
            var req = {
                method: 'GET',
                url: url + '/authenticated'
            };
            $http(req).then(function (response) {
                response.data['image'] = response.data['image'] ? response.data['image'] : '/img/avatar.png';
                $cookies.put('logged_user', response.data);
                defer.resolve(response.data);
            });
            return defer.promise;
        };

    }]);