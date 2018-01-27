# rzp-ionic3-sample-app

Razorpay cordova demo on [ionic v3](http://ionicframework.com)

## Steps

- No need to install the `razorpay-cordova` plugin
- script in index.js
```
  <script  id="rzp" src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

- Declare the `Razorpay` type in the `declarations.d.ts` as
```js
declare var Razorpay: any;
```
This helps the typescript compiler to understand the type of Razorpay's object. Refer this commit https://github.com/razorpay/razorpay-cordova-sample-app/commit/9434f8309f08426621468c1c9cc5a1b27e299fe6


## Important note

`ionic serve` now works with this type of integration!
