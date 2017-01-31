(function () {
    "use strict";
    angular.module('artist-admin', []);

    angular.module('artist-admin').controller('mainController', mainController);

    function mainController($scope, adminConfig, $http) {
        var vm = this;
        vm.formData = {};
        init();

        /**
         * initially executed
         */
        function init() {
            vm.appTitle = adminConfig.appTitle; // app title
            vm.imageCategory = adminConfig.imageCategory; // data for image category drop-down 
            vm.imageMedium = adminConfig.imageMedium; // data for image medium drop-down           
            vm.buttonText = "Save";
            vm.showForm = true;
        }

        /**
         * function to handle save logic
         */
        vm.save = function () {
            vm.saving = true; // set sthe saving flag to true to disable all inputs
            vm.buttonText = "Saving ... "; // sets the button text

            var fd = new FormData(); // form data object
            fd.append("uploadfile", vm.file); // file object
            var inputJSON = { // other form fields
                name: vm.formData.name,
                description: vm.formData.description,
                category: vm.formData.category,
                price: vm.formData.price,
                medium: vm.formData.medium,
                artistName: vm.formData.artistName,
                show: true
            };
            fd.append("inputJSON", JSON.stringify(inputJSON));

            $http({ // AJAX request 'POST'
                method: 'POST',
                url: adminConfig.baseURL + adminConfig.requestURL.save,
                data: fd,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                },
            }).then(function successCallback(response) { // success callback

                alert('Data Saved Successfully !!');
                vm.formData = {}; // resets form fields
                document.getElementById('imageFile').value = "";
                vm.saving = false; // unsets the flag
                vm.buttonText = "Save"; // button text
                vm.listLoaded = false; // to reload the list

            }, function errorCallback(response) { // error callback

                alert('Error Saving .. Try Again ...');
                vm.saving = false; // unsets the flag
                vm.buttonText = "Save"; // button text

            });
        };

        /**
         *  handles the file selection for the page
         */
        vm.FilesSelection = function (input) {
            vm.file = input.files[0];
        };

        /**
         * function to populate the list
         */
        vm.loadList = function () {
            vm.showForm = false;
            vm.listLoading = true; // to show loading

            if (vm.listLoaded) { // flag to check if list is already loaded
                vm.listLoading = false; // to show loading
                return;
            }
            $http({ // AJAX request 'POST'
                method: 'GET',
                url: adminConfig.baseURL + adminConfig.requestURL.list
            }).then(function successCallback(response) { // success callback

                vm.listLoaded = true; // sets flag to indicate list already loaded
                vm.imageList = response.data._embedded.item;
                vm.listLoading = false;

            }, function errorCallback(response) { // error callback

            });

        }
    };
})();