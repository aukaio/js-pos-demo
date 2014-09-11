require.config({
    baseUrl: 'js',

    paths: {
        app: 'app',
        merchant: 'merchant',
        product: 'product',

        jquery: 'libs/jquery/dist/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        backboneLS: 'libs/Backbone.localStorage/backbone.localStorage',
        text: 'libs/requirejs-text/text',

    },

    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"  //attaches "Backbone" to the window object
        }
    }
});


require(['jquery', 'app'], function ($, App) {
    App.start();
});