/**
 * Created by nthienan on 16/06/2016.
 */
bms.service("applianceService", ['$http', '$cookies',
    function ($http, $cookies) {

        var url = '/api/appliances';
        if (!$http.defaults.headers.common.Authorization) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('access_token');
        }

        this.getById = function (applianceId) {
            var req = {
                method: 'GET',
                url: url + '/' + applianceId
            };
            return $http(req);
        };

        this.getAll = function () {
            var req = {
                method: 'GET',
                url: url
            };
            return $http(req);
        };

        this.create = function (newAppliance) {
            if (newAppliance) {
                var req = {
                    method: 'POST',
                    url: url,
                    data: newAppliance
                };
                return $http(req);
            }
        }
    }]);