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
	    if(serial_number == undefined) {
		data = JSON.stringify({})
	    }else{
		data = JSON.stringify({serial_number: serial_number})
	    }
	    $.ajax({
		url: serverUrl + '/merchant/v1/shortlink/',
		type: 'post',
		data: data,
		headers: headers,
		dataType: 'json',
	    }).done(function (res) {
		console.log(res);
		return res;
	    });
        },
	
        pollShortLinkLastScan: function (shortlink_id) {
	    $.ajax({
		url: serverUrl + '/merchant/v1/shortlink/' + String(shortlink_id) + '/last_scan/',
		type: 'get',
		data: {
		    ttl: 60
		},
		headers: headers
	    }).done(function (res) {
		console.log(res);
		if(res != undefined && 'id' in res ) {
		    return res['id'];
		}else{
		    return res
		};
	    });
        },
	
        makePaymentRequest: function (scan_token, amount) {
	    $.ajax({
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
	    }).done(function (res) {
		console.log(res);
		return res;
	    });
	},

        paymentRequestOutcome: function (tid) {
	    $.ajax({
		url: serverUrl + '/merchant/v1/payment_request/' + String(tid) + '/outcome/',
		type: 'get',
		headers: headers
	    }).done(function (res) {
		console.log(res);
		return res;
	    });
	},
	
	updatePaymentRequest: function (tid, action) {
	    $.ajax({
		url: serverUrl + '/merchant/v1/payment_request/' + String(tid) + '/',
		type: 'put',
		data: JSON.stringify({
		    action: action
		}),
		headers: headers,
		dataType: 'json'
	    }).done(function (res) {
		console.log(res);
		return res;
	    });
	},

	abortPaymentRequest: function (tid) {
	    return updatePaymentRequest(tid, 'ABORT');
	},

	capturePaymentRequest: function (tid) {
	    return updatePaymentRequest(tid, 'CAPTURE');
	}	

    };

    return api;

});
