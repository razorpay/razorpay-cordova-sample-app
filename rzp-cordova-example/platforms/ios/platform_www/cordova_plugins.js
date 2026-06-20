cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.razorpay.cordova.RazorpayCheckout",
      "file": "plugins/com.razorpay.cordova/www/RazorpayCheckout.js",
      "pluginId": "com.razorpay.cordova",
      "clobbers": [
        "RazorpayCheckout"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-cocoapod-support": "1.6.2",
    "com.razorpay.cordova": "0.16.1"
  };
});