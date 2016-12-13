cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.razorpay.cordova/www/RazorpayCheckout.js",
        "id": "com.razorpay.cordova.RazorpayCheckout",
        "pluginId": "com.razorpay.cordova",
        "clobbers": [
            "RazorpayCheckout"
        ]
    },
    {
        "file": "plugins/com.razorpay.cordova/src/browser/CheckoutProxy.js",
        "id": "com.razorpay.cordova.CheckoutProxy",
        "pluginId": "com.razorpay.cordova",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "com.razorpay.cordova": "0.13.1"
}
// BOTTOM OF METADATA
});