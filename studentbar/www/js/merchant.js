define(['jquery', 'libs/when/poll'], function ($, poll) {

    var serverUrl = 'https://mcashdevelop.appspot.com';
    var merchant_id = 'dummy';
    var merchant_user_id = 'apu';
    var secret = 'supersecret';
    var pos_id = 'default';
    var headers = {
	"Accept": 'application/vnd.mcash.api.merchant.v1+json',
	"Content-Type": 'application/json',
	"X-Mcash-Merchant": merchant_id,
	"X-Mcash-User": merchant_user_id,
	"Authorization": 'SECRET ' + secret};

    var api = {

        createShortlink: function (serial_number) {
            data = {};
            if(!serial_number) {
                data.serial_number = serial_number;
            }
            return $.ajax({
                url: serverUrl + '/merc1hant/v1/shortlink/',
                type: 'post',
                data: JSON.stringify(data),
                headers: headers,
                dataType: 'json',
            });
        },

        pollShortLinkLastScan: function(shortlink_id, ttl) {
            ttl = ttl || 60;
            return poll(
                function () {
                    return $.ajax({
                        url: serverUrl + '/merchant/v1/shortlink/' + shortlink_id + '/last_scan/',
                        type: 'get',
                        data: {
                            ttl: ttl
                        },
                        headers: headers
                    }).then(function(res) {
                        if (res && 'id' in res) {
                            return res.id;
                        }
                    });
                }, 1000, function (res) {
                    return res;
                }
            );
        },

        makePaymentRequest: function (scan_token, amount) {
            return $.ajax({
                url: serverUrl + '/merchant/v1/payment_request/',
                type: 'post',
                data: JSON.stringify({
                    customer: scan_token,
                    currency: 'NOK',
                    amount: amount,
                    pos_id: pos_id,
                    pos_tid: scan_token,
                    allow_credit: true,
                    action: 'auth'
                }),
                headers: headers,
                dataType: 'json'
            });
        },

        paymentRequestOutcome: function (tid) {
            return $.ajax({
                url: serverUrl + '/merchant/v1/payment_request/' + tid + '/outcome/',
                headers: headers
            });
        },

        updatePaymentRequest: function (tid, action) {
            return $.ajax({
                url: serverUrl + '/merchant/v1/payment_request/' +tid + '/',
                type: 'put',
                data: JSON.stringify({
                    action: action
                }),
                headers: headers,
                dataType: 'json'
            });
        },

        abortPaymentRequest: function (tid) {
            return api.updatePaymentRequest(tid, 'ABORT');
        },

        capturePaymentRequest: function (tid) {
            return api.updatePaymentRequest(tid, 'CAPTURE');
        }
    };

    return api;

});
