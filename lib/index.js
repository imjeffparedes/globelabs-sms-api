"use strict";

const request = require("request")
    , querystring = require("querystring")
    ;

module.exports = class GlobeLabsSMS {
    /**
     * GlobeLabsSMS
     * Creates the instance of the `GlobeLabsSMS` class.
     *
     * @name GlobeLabsSMS
     * @function
     * @param {Object} options An object containing:
     *
     *  - `senderAddress` (String): Refers to the application short code suffix (last 4 digits) (mandatory).
     *  - `version` (String): GlobeLabsSMS api version appended to host. (default: `v1`).
     *  - `host` (String): GlobeLabsSMS api host (default: `https://devapi.globelabs.com.ph/`).
     */
    constructor (options) {
        this.options = options;
        this.senderAddress = options.senderAddress || process.env.SENDER_ADDRESS;
        this.version = options.version || 'v1';
        this.host = options.host || "https://devapi.globelabs.com.ph/";
    }

    /**
     * sendMessage
     * Send an SMS message to one or more mobile terminals:
     *
     * @name sendMessage
     * @function
     * @param {Object} params The Sending Messages parameters (documented [here](https://www.globelabs.com.ph/docs/#sms)).
     * @param {Object} data The Sending Messages body (documented [here](https://www.globelabs.com.ph/docs/#sms)).
     * @param {Function} cb The callback function.
     */
    sendMessage (params, data, cb) {
        return this._request({
            url: "smsmessaging"
          , method: "POST"
          , data: data
        }, cb);
    }


    /**
     * _request
     * Low level function for making requests to the API endpoints.
     *
     * @name _request
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `url` (String): The api endpoint.
     *  - `method` (String): The request method (default: `get`).
     *  - `params` (Object): The params object.
     *  - `data` (Object): The POST data object.
     *  - `version` (String): API Version. If not specified your pinned verison is used.
     *
     * @param {Function} cb The callback function.
     */
    _request (options, cb) {

        if(options.data)
          Object.assign(options.data,{
            apikey: this.apiKey
          })
        if(options.params)
          Object.assign(options.params,{
            apikey: this.apiKey
          })

        let _url = options.url
          , method = options.method || "get"
          , params = options.params || {}
          , data = options.data
          , version = options.version || this.version
          , qs = querystring.stringify(params)
          , removeTrailingSlash = options.removeTrailingSlash || false
          , url = this.host + _url + "/" + version + "/"  + (removeTrailingSlash ? "" : "/") + (qs ? "?" + qs : "")
          ;

        return request({
            url: url
          , method: method
          , headers: {
             'Content-Type': 'application/json'
            }
          , json: data ? data : true
        }, (err, res) => {
            if (res.body && res.body.error) {
                err = new Error(res.body.error.message);
            }
            if (err) { return cb(err, null, res); }
            cb(null, res.body, res);
        })
    }
};