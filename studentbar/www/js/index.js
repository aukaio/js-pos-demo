require.config({
    baseUrl: 'js',

    paths: {
        app: 'app',
        merchant: 'merchant',

        jquery: 'libs/jquery/dist/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
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