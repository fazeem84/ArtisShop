(function () {

    "use strict";

    angular
        .module('artist')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                templateUrl: 'modules/base/base.html',
                controller: 'mainController',
                controllerAs: 'vm'
            })
            .state('app.home', {
                url: 'home',
                templateUrl: 'modules/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .state('app.admin', {
                url: 'admin',
                templateUrl: 'modules/admin/admin.html',
                controller: 'adminController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('home');
    }

})();