/**
 * Created by nthienan on 30/06/2016.
 */
bms.service("linkService", ['$http', '$httpParamSerializer', '$q',
    function ($http, $httpParamSerializer, $q) {

        this.get = function (entity, rel) {
            var defer = $q.defer();
            if (entity && entity['_links'] && rel) {
                var req = {
                    method: 'GET',
                    url: entity['_links'][rel]['href']
                };
                $http(req).then(function (response) {
                    entity[rel] = response.data;
                    defer.resolve(entity);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            }
        };
    }]);