/**
 * Created on 15/06/2016.
 * @author nthienan
 */
bms.controller('applianceAddCtrl', ['$scope', 'applianceService', '$log', '$mdDialog', '$q', 'userService', '$timeout',
    function ($scope, applianceService, $log, $mdDialog, $q, userService, $timeout) {
        $scope.cancel = $mdDialog.cancel;

        $scope.create = function () {
            $scope.item.form.$setSubmitted();
            if ($scope.item.form.$valid) {
                applianceService.create($scope.appliance).then(function (response) {
                    $mdDialog.hide(response.data);
                });
            }
        };

        $scope.appliance = {owners: []};
        var cachedQuery, pendingSearch, lastSearch, cancelSearch = angular.noop;

        /**
         * Debounce if querying faster than 300ms
         */
        var debounceSearch = function () {
            var now = new Date().getMilliseconds();
            lastSearch = lastSearch || now;
            return (now - lastSearch < 500);
        };

        var querySearch = function (criteria) {
            cachedQuery = cachedQuery || criteria;
            var queryStr = 'firstName:*' + angular.lowercase(criteria) + '*';
            return cachedQuery ?
                userService.search(queryStr).then(function (response) {
                    return response.data;
                }) : [];
        };

        /**
         * Async search for users
         */
        $scope.asyncSearch = function (criteria) {
            cachedQuery = criteria;
            if (!pendingSearch || !debounceSearch()) {
                cancelSearch();
                return pendingSearch = $q(function (resolve, reject) {
                    cancelSearch = reject;
                    $timeout(function() {
                        resolve(querySearch(criteria));
                        lastSearch = 0;
                        pendingSearch = null;
                        cancelSearch = angular.noop;
                    });
                });
            }
            return pendingSearch;
        };
    }
]);