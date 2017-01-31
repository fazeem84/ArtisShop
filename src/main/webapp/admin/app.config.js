(function () {

    angular.module('artist-admin').constant('adminConfig', {
        appTitle : 'Jinu',
        lang: "en", // app default locale format
        baseURL: '/', // app service URL
        requestURL: {
            save: 'createItem',
            list : 'item'
        },
        // data for image category drop-down 
        imageCategory: [
            {
                "value": "Landscape"
            }, {
                "value": "Portrait"
            }, {
                "value": "Abstract"
            }, {
                "value": "Other"
            }
        ],
        // data for image medium drop-down           
        imageMedium: [
            {
                "value": "Acrylic"
            }, {
                "value": "Oil"
            }, {
                "value": "Watercolor"
            }, {
                "value": "Pastel"
            }, {
                "value": "Other"
            }
        ]
    });

})();