# rzp-ionic2-sample-app

Razorpay cordova demo on [ionic v2](http://ionicframework.com/docs/v2)

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
This helps the typescript compiler to understand the type of RazorpayCheckout's object. Refer this commit https://github.com/razorpay/razorpay-cordova-sample-app/commit/20a8abfdbbb437c5bfc56c0d872040f936dd2f7f


## Important note

`ionic serve` doesn't support cordova browser plugins at the moment. See [driftyco/ionic-cli#354](https://github.com/driftyco/ionic-cli/issues/354). However, things should work fine with `ionic run browser`
