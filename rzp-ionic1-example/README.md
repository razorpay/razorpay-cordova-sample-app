# rzp-ionic1-sample-app

Razorpay cordova demo on [ionic v1](http://ionicframework.com/)

## Steps

- Install the `razorpay-cordova` plugin

```bash
cd your-project-folder
cordova platform add android      # optional
cordova platform add ios          # optional
cordova platform add browser      # optional
cordova plugin add https://github.com/razorpay/razorpay-cordova.git --save
```

- Make sure you call the `RazorpayCheckout.open(options, successCallback, cancelCallback)` inside `$ionicPlatform.ready` event. Refer [here](https://github.com/razorpay/razorpay-cordova-sample-app/blob/master/rzp-ionic1-example/www/js/app.js#L52-L57) for sample

## Important note

`ionic serve` doesn't support cordova browser plugins at the moment. See [driftyco/ionic-cli#354](https://github.com/driftyco/ionic-cli/issues/354). However, things should work fine with `ionic run browser`
