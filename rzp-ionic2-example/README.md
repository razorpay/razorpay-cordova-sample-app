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

## Important note

`ionic serve` doesn't support cordova browser plugins at the moment. See [driftyco/ionic-cli#354](https://github.com/driftyco/ionic-cli/issues/354). However, things should work fine with `ionic run browser`
