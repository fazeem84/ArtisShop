(function () {
	angular
	.module('eJag')
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
	});
})();

(function () {
	angular
	.module('eJag')
	.factory('httpInterceptor', httpInterceptor);

	function httpInterceptor($injector) {
		return {
			request: function(config) {
				return config;
			},

			requestError: function(config) {
				return config;
			},

			response: function(res) {				
				if (res.status == 401){ // redirects to login page on unauthorized access
					$injector.get('apiService').logoutAction();
				}
				return res;
			},

			responseError: function(res) {
				if (res.status == 401){ // redirects to login page on unauthorized access
					$injector.get('apiService').logoutAction();
				}
				return res;
			}
		}
	}
})();