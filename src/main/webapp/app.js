(function () {
    "use strict";
    angular.module('artist', []);

    angular.module('artist').controller('mainController', mainController);

    function mainController($scope, appConfig, $http) {
        var vm = this;
        init();

        function init() {
            vm.appName = appConfig.title;
            vm.appDesc = appConfig.subTitle;
            vm.imageList = [];
            vm.formData = {};
            vm.buttonText = "Send";

            $http({ // AJAX request 'POST'
                method: 'GET',
                url: appConfig.baseURL + appConfig.requestURL.list
            }).then(function successCallback(response) { // success callback
                var list = response.data._embedded.item;
                for (var i = 0; i < list.length; i++) {
                    if (list[i].show) {
                        list[i].url = appConfig.baseURL + 'files/' + list[i].id;
                        vm.imageList.push(list[i]);
                    }
                }

            }, function errorCallback(response) { // error callback

            });

            setTimeout(function () {
                main.initViewer(Math.floor((Math.random() * vm.imageList.length)));
            }, 300);
        }
        /**
         *
         */
        function showPopUp(item, showForm) {

            if (!showForm) {
                // sets the heading
                $('.pop-up-header')[0].innerHTML = "";
                // sets the content
                $('.pop-up-body')[0].innerHTML = "";
            }

            // When the user clicks on <span> (x), close the modal
            $('.pop-up-close')[0].onclick = function () {
                $('#myModal').fadeOut();
                if (showForm) {
                    vm.popData = undefined;
                    vm.showForm = false;
                }
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                    if (event.target == $('#myModal')[0]) {
                        $('#myModal').fadeOut();
                        if (showForm) {
                            vm.popData = undefined;
                            vm.showForm = false;
                        }
                    }
                }
                // shows the pop up
            $('#myModal').fadeIn();
        };
        /**
         *
         */
        vm.showInterest = function (item, showForm) {
            vm.popData = item;
            vm.showForm = true;
            showPopUp(item, true)
        };
        /**
         *
         */
        vm.sendInterest = function () {
            if (!vm.formData.comments)
                vm.formData.comments = null;

            vm.formData.itemID = vm.popData.id;

            $http({ // AJAX request 'POST'
                method: 'POST',
                url: appConfig.baseURL + appConfig.requestURL.sendMail,
                data: vm.formData
            }).then(function successCallback(response) { // success callback

            }, function errorCallback(response) { // error callback

            });
        }

    };
})();