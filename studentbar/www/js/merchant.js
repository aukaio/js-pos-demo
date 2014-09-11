define(['jquery'], function ($) {

    var serverUrl = 'https://localhost:8080'

    var api = {

        createShortlink: function (options) {
            $.post(serverUrl + '/merchant/v1/shortlink/', options)
            .done(function (res) {
                console.log(res);
            });
        }

    };

    return api;

});