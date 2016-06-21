var bms = angular.module('bms', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router', 'ngMaterial']);

bms.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        /* route config */
        $stateProvider
            .state('appliance', {
                url: '/appliance',
                templateUrl: 'templates/appliance/home.html',
                controller: 'applianceCtrl'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'templates/appliance/home.html',
                controller: 'applianceCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            });
        $urlRouterProvider.otherwise('/appliance');

        $httpProvider.interceptors.push(function () {
            return {
                'request': function (config) {
                    if (config.url && config.url.endsWith('.html')) {
                        config.headers['Accept'] = 'text/html;charset=UTF-8';
                        delete config.headers['Authorization'];
                    }
                    return config;
                }
            };
        });

    }]);
