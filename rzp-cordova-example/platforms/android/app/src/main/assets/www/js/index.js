/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var rzpOptions = {
    key: "rzp_test_1DP5mmOlF5G5ag",
    amount: "2000", // 2000 paise = INR 20
    name: "Merchant Name",
    description: "Purchase Description",
    image: "https://i.imgur.com/n5tjHFD.png",
    handler: function (response){
        alert(response.razorpay_payment_id);
    },
    prefill: {
        name: "Harshil Mathur",
        email: "harshil@razorpay.com"
    },
    notes: {
        address: "Hello World"
    },
    theme: {
        color: "#F37254"
    }
};

var successCallback = function(payment_id) {
  alert('payment_id: ' + payment_id)
};

var cancelCallback = function(error) {
  alert(error.description + ' (Error '+error.code+')')
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.addRZPEventListener();
    },

    addRZPEventListener: function() {
        document.getElementById('rzp-button').addEventListener('click', function(event) {
            RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
            event.preventDefault();
        })
    }
};

app.initialize();
