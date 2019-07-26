"use strict";

const GlobeLabsSMS = require("../lib");

var client = new GlobeLabsSMS({
    senderAddress: process.env.SENDER_ADDRESS
    // This is optional
  , version: 'v1'
  , host: process.env.HOST || "https://devapi.globelabs.com.ph/"
});

client.sendMessage(
    {
        //required if consent workflow is enabled in account
        access_token: '3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g'
    },
    {
        "outboundSMSMessageRequest": {
           "clientCorrelator": "123456",
           "senderAddress": "1234",
           "outboundSMSTextMessage": {"message": "Hello World"},
           "address": "9171234567"
         }
    }, (err, data) => {
    console.log(err || data);
    // =>
    // {
    // "outboundSMSMessageRequest": {
    //   "address": "tel:+639175595283",
    //   "deliveryInfoList": {
    //     "deliveryInfo": [],
    //     "resourceURL": "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8011/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g"
    //   },
    //   "senderAddress": "8011",
    //   "outboundSMSTextMessage": {
    //     "message": "Hello World"
    //   },
    //   "receiptRequest": {
    //     "notifyURL": "http://test-sms1.herokuapp.com/callback",
    //     "callbackData": null,
    //     "senderName": null,
    //     "resourceURL": "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8011/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g"
    //   }
    // }
    //}
});
