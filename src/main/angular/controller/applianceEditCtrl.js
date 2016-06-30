/**
 * Created on 15/06/2016.
 * @author nthienan
 */
bms.controller('applianceEditCtrl', ['$scope', 'applianceService', '$log', '$mdDialog', 'userService', 'appliance', '$q', '$timeout',
    function ($scope, applianceService, $log, $mdDialog, userService, appliance, $q, $timeout) {
        $scope.appliance = appliance;
        $scope.cancel = $mdDialog.cancel;
        appliance['owners'] = appliance['owners'] ? appliance['owners'] : [];
        var cachedQuery, pendingSearch, lastSearch, cancelSearch = angular.noop;

        $scope.update = function () {
            $scope.item.form.$setSubmitted();
            if ($scope.item.form.$valid) {
                applianceService.update($scope.appliance).then(function (response) {
                    $mdDialog.hide(response.data);
                });
            }
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
         * Debounce if querying faster than 300ms
         */
        var debounceSearch = function () {
            var now = new Date().getMilliseconds();
            lastSearch = lastSearch || now;
            return (now - lastSearch < 500);
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