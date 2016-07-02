'use strict';
var bms = angular.module('bms', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router', 'ngMaterial',
    'md.data.table']);

bms.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        /* route config */
        $stateProvider
            .state('appliance', {
                url: '/appliance',
                templateUrl: 'templates/appliance/list.html',
                controller: 'applianceCtrl'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'templates/appliance/list.html',
                controller: 'applianceCtrl'
            });
        $urlRouterProvider.otherwise('/appliance');

        $httpProvider.interceptors.push(['$q', '$injector', '$httpParamSerializer', '$cookies', '$window',
            function ($q, $injector, $httpParamSerializer, $cookies, $window) {
                return {
                    'request': function (config) {
                        if (config.url && config.url.endsWith('.html')) {
                            config.headers['Accept'] = 'text/html;charset=UTF-8';
                            delete config.headers['Authorization'];
                        } else {
                            if (!config.headers['Authorization']) {
                                config.headers['Authorization'] = 'Bearer ' + $cookies.get('access_token');
                            }
                        }
                        return config;
                    },
                    'responseError': function (loginError) {
                        if (loginError.status === 401 && loginError.data.error && loginError.data.error === "invalid_token") {
                            var defer = $q.defer();
                            // Get a new token... (cannot inject $http directly as will cause a circular ref)
                            var clientCredential = 'bms:s3cr3t';
                            var url = '/oauth/token';
                            var params = {
                                grant_type: 'refresh_token',
                                refresh_token: $cookies.get('refresh_token')
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
                            $injector.get("$http")(req).then(function (response) {
                                if (response && response.data) {
                                    $injector.get("$http").defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                                    var expireDate = new Date(new Date().getTime() + (1000 * response.data.expires_in));
                                    $cookies.put('access_token', response.data.access_token, {'expires': expireDate});
                                    $cookies.put('refresh_token', response.data.refresh_token);
                                    // now let's retry the original request - transformRequest in .run() below will add the new OAuth token
                                    loginError.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                                    $injector.get("$http")(loginError.config).then(function (response1) {
                                        defer.resolve(response1);
                                    }, function (error1) {
                                        defer.reject(error1);
                                    });
                                } else {
                                    $window.location.href = '/welcome.html';
                                    defer.reject();
                                }
                            }, function (error) {
                                // token retry failed, redirect so user can login again
                                $window.location.href = '/welcome.html';
                                defer.reject(error);
                            });
                            return defer.promise; // return the deferred promise
                        }
                    }
                };
            }]);
    }]);
