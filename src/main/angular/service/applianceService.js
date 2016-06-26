/**
 * Created by nthienan on 16/06/2016.
 */
bms.service("applianceService", ['$http', '$cookies', '$httpParamSerializer',
    function ($http, $cookies, $httpParamSerializer) {

        var url = '/api/appliances';

        this.getById = function (applianceId) {
            var req = {
                method: 'GET',
                url: url + '/' + applianceId
            };
            return $http(req);
        };

        this.getAll = function (pageRequest) {
            var data = {
                page: pageRequest.page - 1,
                size: pageRequest.size,
                sort: pageRequest.sort.indexOf('-') === 0 ? pageRequest.sort.substring(1) + ",desc" : pageRequest.sort
            };
            var req = {
                method: 'GET',
                url: url + '?' + $httpParamSerializer(data)
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
        };

        this.delete = function (applianceId) {
            var req = {
                method: 'DELETE',
                url: url + '/' + applianceId
            };
            return $http(req);
        };

        this.deletes = function (appliances) {
            if (appliances) {
                var applianceIds = '';
                appliances.forEach(function (appliance) {
                    applianceIds += ',' + appliance.id
                });
                var req = {
                    method: 'DELETE',
                    url: url + '?ids=' + applianceIds.substring(1)
                };
                return $http(req);
            }
        };

        this.update = function (appliance) {
            if (appliance) {
                var req = {
                    method: 'PUT',
                    url: url,
                    data: appliance
                };
                return $http(req);
            }
        };
    }]);