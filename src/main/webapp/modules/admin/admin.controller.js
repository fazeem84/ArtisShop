(function () {
    "use strict";

    angular
        .module('artist')
        .controller('adminController', adminController);

    /* ngInject */
    function adminController($scope, $rootScope) {
        var vm = this;
        init();

        function init() {
            
        }

    }

})();