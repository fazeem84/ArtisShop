(function () {

    angular.module('artist').constant('appConfig', {
        title: " Jinu", // app name          
        subTitle: "GYUs here", // app name          
        lang: "en", // app default locale format
        baseURL: '', // app service URL
        requestURL: {
            list: 'item',
            sendMail : 'sendMail'
        }
    });

})();