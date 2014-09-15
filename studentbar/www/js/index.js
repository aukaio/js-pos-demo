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




var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        console.log('app.initialize()');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            // On smart phone
            document.addEventListener("deviceready", onDeviceReady, false);
        } else {
            // On browser
            this.onDeviceReady();
        }
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        require(['jquery', 'app', 'merchant'], function ($, App, Merchant) {
            console.log('debug before App.start();')
            App.start();
            console.log('debug after App.start();')
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        //console.log('Received Event: ' + id);
    }
};