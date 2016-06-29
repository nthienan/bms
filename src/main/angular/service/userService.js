/**
 * Created by nthienan on 27/06/2016.
 */
bms.service("userService", ['$http', '$cookies', '$httpParamSerializer',
    function ($http, $cookies, $httpParamSerializer) {

        var url = '/api/users';

        this.getById = function (userId) {
            var req = {
                method: 'GET',
                url: url + '/' + userId
            };
            return $http(req);
        };

        this.search = function (query) {
            if (query) {
                var req = {
                    method: 'GET',
                    url: url + '/search?' + $httpParamSerializer({query: query})
                };
                return $http(req);
            }
        };
    }]);