// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

myApp.controller('RZPController', function($scope, $ionicPlatform) {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_1DP5mmOlF5G5ag',
    amount: '5000',
    name: 'foo',
    prefill: {
      email: 'pranav@razorpay.com',
      contact: '8879524924',
      name: 'Pranav Gupta'
    },
    theme: {
      color: '#F37254'
    }
  };

  // `ng-click` is triggered twice on ionic. (See https://github.com/driftyco/ionic/issues/1022).
  // This is a dirty flag to hack around it
  var called = false

  var successCallback = function(payment_id) {
    alert('payment_id: ' + payment_id);
    called = false
  };

  var cancelCallback = function(error) {
    alert(error.description + ' (Error ' + error.code + ')');
    called = false
  };

  $ionicPlatform.ready(function(){
    $scope.pay = function() {
      if (!called) {
        RazorpayCheckout.open(options, successCallback, cancelCallback);
        called = true
      }
    }
  });
})
