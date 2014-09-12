require.config({
    baseUrl: 'js',

    paths: {
        app: 'app',
        merchant: 'merchant',
        shop: 'shop',

        jquery: 'libs/jquery/dist/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        backboneLS: 'libs/Backbone.localStorage/backbone.localStorage',
        text: 'libs/requirejs-text/text',
        bootstrap: 'libs/bootstrap/dist/js/bootstrap'

    },

    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"  //attaches "Backbone" to the window object
        }
    }
});


require(['jquery', 'app', 'merchant'], function ($, App, Merchant) {
    console.log('debug before App.start();')
    App.start();
    console.log('debug after App.start();')
});

