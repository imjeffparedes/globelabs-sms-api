
## :memo: Documentation

You can see below the API reference of this module.

### `GlobeLabsSMS(options)`
Creates the instance of the `GlobeLabsSMS` class.

#### Params

 - **Object** `options`: An object containing:
 - `senderAddress` (String): Refers to the application short code suffix (last 4 digits) (mandatory).
 - `version` (String): GlobeLabsSMS api version appended to host. (default: `v1`).
 - `host` (String): GlobeLabsSMS api host (default: `https://devapi.globelabs.com.ph/`).
 


### `sendMessage(params, data, cb)`
Send an SMS message to one or more mobile terminals

#### Params

- **Object** `data`: The Sending Messages body (documented [here](https://www.globelabs.com.ph/docs/#sms)).
- **Object** `params`: The Sending Messages parameters (documented [here](https://www.globelabs.com.ph/docs/#sms)).
- **Function** `cb`: The callback function.
