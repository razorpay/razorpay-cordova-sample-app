# rzp-ionic3-sample-app

Razorpay cordova demo on [ionic v3](http://ionicframework.com)

## Steps

- Install the `razorpay-cordova` plugin

```bash
cd your-project-folder
cordova platform add android      # optional
cordova platform add ios          # optional
cordova platform add browser      # optional
cordova plugin add https://github.com/razorpay/razorpay-cordova.git --save
```

- Declare the `RazorpayCheckout` type in the `declarations.d.ts` as
```js
declare var RazorpayCheckout: any;
```
This helps the typescript compiler to understand the type of RazorpayCheckout's object. Refer this commit https://github.com/razorpay/razorpay-cordova-sample-app/commit/9434f8309f08426621468c1c9cc5a1b27e299fe6


## Important note

`ionic serve` doesn't support cordova browser plugins at the moment. See [driftyco/ionic-cli#354](https://github.com/driftyco/ionic-cli/issues/354).
This comment however workarounds the issue https://github.com/ionic-team/ionic-cli/issues/354#issuecomment-269223842
