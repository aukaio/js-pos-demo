define(['jquery'], function ($) {

    var serverUrl = 'https://mcashdevelop.appspot.com'
    var merchant_id = 'dummy'
    var merchant_user_id = 'apu'
    var secret = 'supersecret'
    var pos_id = 'default'
    var headers = {
	"Accept": 'application/vnd.mcash.api.merchant.v1+json',
	"Content-Type": 'application/json',
	"X-Mcash-Merchant": merchant_id,
	"X-Mcash-User": merchant_user_id,
	"Authorization": 'SECRET ' + secret}

    var api = {

        createShortlink: function (serial_number) {
	    $.ajax({
		url: serverUrl + '/merchant/v1/shortlink/',
		type: 'post',
		data: {
		    serial_number: serial_number
		},
		headers: headers,
		dataType: 'json',
	    }).done(function (res) {
		console.log(res);
	    });
        },
	
        shortLinkLastScan: function (shortlink_id) {
	    $.ajax({
		url: serverUrl + '/merchant/v1/shortlink/' + String(shortlink_id) + '/last_scan/',
		type: 'get',
		data: {
		    ttl: 60
		},
		headers: headers
	    }).done(function (res) {
		console.log(res);
	    });
        },
	
        makePaymentRequest: function (scan_token, amount) {
	    $.ajax({
		url: serverUrl + '/merchant/v1/shortlink/',
		type: 'post',
		data: {
		    customer: scan_token,
		    currency: 'NOK',
		    amount: amount,
		    pos_id: pos_id,
		    pos_tid: scan_token,
		    action: 'auth'
		},
		headers: headers,
		dataType: 'json'
	    }).done(function (res) {
		console.log(res);
	    });
	}


    };

    return api;

});
