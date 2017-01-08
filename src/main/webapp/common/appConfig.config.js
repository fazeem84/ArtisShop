//set global configuration of application and it can be accessed by injecting appConstants in any modules

(function () {
    angular
        .module('eJag')
        .constant('appConfig', {

            title: "e-Jagratha", // app name
            subTitle : "IT Awareness Campaign",
            lang: "en", // app default locale format
            baseURL: '', // app service URL
            requestURL: {
            	authRequest: 'oauth/token', // oauth request
                schoolSave : 'school/save', // save a school
                schoolAllList : 'school/listAll',
                schoolDistList : 'school/district/',
                schoolDetails : 'school/',
                logout : 'logout' // logout service
            }

        });
})();