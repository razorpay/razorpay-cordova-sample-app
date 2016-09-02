cordova.define("com.razorpay.cordova.RazorpayCheckout", function(require, exports, module) {
/*global cordova, module*/

module.exports = {
    open: function (options, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Checkout", "open", [JSON.stringify(options)]);
    }
};

});
