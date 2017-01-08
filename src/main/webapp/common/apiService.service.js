(function () {
	angular
	.module('eJag')
	.service('apiService', apiService);

	function apiService($rootScope, $http, $q, $state, appConfig, $mdDialog, $cookies) {

		/**
		 * function to place http request
		 */
		this.serviceRequest = function (params, success, fail) {

			var requestParams = angular.merge({
				method: params.method || "GET",
				url: appConfig.baseURL + params.URL,
				data: params.payLoad || {},
				headers: params.headers || {
					'Content-Type': ''
				}
			}, params.addOns);

			var request = $http(requestParams);
			request.then(function successCallback(response) {
				if (success)
					success(response.data);
			}, function errorCallback(response) {
				if (fail)
					fail(response.data);
			});		
		};

		/**
		 * function to place async service request
		 */
		this.asyncServiceRequest = function (params) {
			var deferred = $q.defer(); // creating the promise object

			serviceRequest(params, function (response) {
				deferred.resolve(response); // resolving the promise
			}, function (response) {
				deferred.reject(response); // rejecting the promise
			});

			return deferred.promise; // returning the promise object
		};

		/**
		 * function to place async service request
		 */
		this.showPopUp = function (popHeading, popBody) {        	
			// sets the heading
			$('.pop-up-heading')[0].innerHTML = popHeading;
			// sets the content
			$('.pop-up-body')[0].innerHeight = popBody;

			// When the user clicks on <span> (x), close the modal
			$('.pop-up-close')[0].onclick = function () {
				$('#myModal').fadeOut();
			}
			// sets the content
			$('.pop-up-body')[0].innerHTML = popBody;
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function (event) {
				if (event.target == $('#myModal')[0]) {
					$('#myModal').fadeOut();
				}
			}
			// shows the pop up
			$('#myModal').fadeIn();
		};
		/**
		 *  function to show alert messages
		 */
		this.showAlert = function (param, callback) {
			alert = $mdDialog.alert({
				title: param.title || 'E-Jagrata Alert !',
				textContent: param.text,
				ok: param.title || 'Ok'
			});

			$mdDialog
			.show(alert)
			.finally(function () {
				if (callback)
					callback();
			});
		};
		/**
		 *  logout actions
		 */
		this.logoutAction = function (){    
			cleanupLoginSettings();

			this.serviceRequest({
				URL: appConfig.requestURL.logout    		
			});    	

			function cleanupLoginSettings(){
				// removes all cookies
				var cookies = $cookies.getAll();
				angular.forEach(cookies, function (value, key) {
					$cookies.remove(key);
				});    			
				delete $http.defaults.headers.common.Authorization;  // clears Authorization header    			
				$state.go('admin'); // route to the specified page    		
			}
		};
	}
})();