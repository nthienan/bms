'use strict';
var welcome = angular.module('welcome', ['ngRoute', 'ngCookies', 'ngSanitize', 'ngAnimate', 'ui.router', 'ngMaterial']);

welcome.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        /* route config */
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            });
        $urlRouterProvider.otherwise('/login');

        $httpProvider.interceptors.push(['$q', '$injector',
            function ($q, $injector) {
                return {
                    'request': function (config) {
                        if (config.url && config.url.endsWith('.html')) {
                            config.headers['Accept'] = 'text/html;charset=UTF-8';
                            delete config.headers['Authorization'];
                        }
                        return config;
                    }
                };
            }]);
    }]);
