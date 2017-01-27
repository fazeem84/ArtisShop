(function () {
    "use strict";

    angular
        .module('artist', []);

    angular
        .module('artist')
        .constant('appConfig', {

            title: "Artist Jinu", // app name          
            subTitle: "Sub heading goes here", // app name          
            lang: "en", // app default locale format
            baseURL: '', // app service URL
            requestURL: {

            }

        });


    angular
        .module('artist')
        .controller('mainController', mainController);

    function mainController($scope, appConfig) {
        var vm = this;
        init();

        function init() {
            vm.appName = appConfig.title;
            vm.appDesc = appConfig.subTitle;
            vm.imageList = [{
                url: "images/fulls/01.jpg",
                description: "this is art",
                artist: "Jinu",
                price: "10"
            }, {
                url: "images/fulls/02.jpg",
                description: "this is art",
                artist: "Jinu",
                price: "10"
            }, {
                url: "images/fulls/03.jpg",
                description: "this is art",
                artist: "Jinu",
                price: "10"
            }];

            setTimeout(function () {
                main.initViewer(Math.floor((Math.random() * vm.imageList.length) + 1));
            }, 1000);
        }
    };



})();