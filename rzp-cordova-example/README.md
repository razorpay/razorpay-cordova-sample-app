# rzp-cordova-sample-app

Razorpay cordova demo

## Steps

- Install the `razorpay-cordova` plugin

```bash
cd your-project-folder
cordova platform add android      # optional
cordova platform add ios          # optional
cordova platform add browser      # optional
cordova plugin add https://github.com/razorpay/razorpay-cordova.git --save
```

- Make sure you call the `RazorpayCheckout.open(options, successCallback, cancelCallback)` inside `deviceready` event. Refer [here](https://github.com/razorpay/razorpay-cordova-sample-app/blob/master/rzp-cordova-example/www/js/index.js#L65-L74) for sample

## A word on CSP

On the browser platform, change the [Content Security Policy](https://content-security-policy.com/) to whitelist the razorpay.com domain.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://*.razorpay.com data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
```
