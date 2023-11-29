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
        amount: 2000,
        currency: "INR",
        prefill: {
            contact: "1234567890",
            email: "settipalli.jaswanth@razorpay.com"
        },
        theme: {
            color: "#063970"
        },
        send_sms_hash: true,
        retry: {
             enabled: false,
             max_count: 4
        },
        disable_redesign_v15: false,
        "experiments.upi_turbo": true,
        ep: "https://api-web-turbo-upi.ext.dev.razorpay.in/test/checkout.html"
};

var successCallback = function(payment_id) {
  alert('payment_id: ' + payment_id)
};

var cancelCallback = function(error) {
  alert(JSON.stringify(error))
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
        console.log("device ready")
        app.addRZPEventListener();
    },

    addRZPEventListener: function() {
        document.getElementById('rzp-button').addEventListener('click', function(event) {
        let mobileNumber = getAndValidateMobileNumber()
        if(mobileNumber!==null){
        rzpOptions.prefill.contact = mobileNumber
                    RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
                    event.preventDefault();
        }
        })

        document.getElementById('link-new-upi-account').addEventListener('click', function (event) {
           let mobileNumber = getAndValidateMobileNumber()
            let color = "#063970"
            if(mobileNumber!==null){
            console.log("mobile number is : "+mobileNumber)
           RazorpayCheckout.upiTurbo.linkNewUpiAccount(mobileNumber, color, function (upiAccounts){
                           alert(upiAccounts.data)
                       }, function(error){
                           alert(error)
                       })
            }
        })
        document.getElementById('init-turbo').addEventListener('click', function (event){
        let key = "rzp_test_0wFRWIZnH65uny";
            RazorpayCheckout.initUpiTurbo(key)
            alert("Turbo is initialized")
        })

        document.getElementById('manage-upi-accounts').addEventListener('click', function (event) {
            let mobileNumber = getAndValidateMobileNumber()
            let color = "#063970"
             if(mobileNumber!==null){
             RazorpayCheckout.upiTurbo.manageUpiAccounts(mobileNumber, color, function(error){
                             alert(error)
                         })
             }
        })

        function getAndValidateMobileNumber() {
                    let mobileNumber = document.getElementById('mobileNumber').value;

                    // Validate if the mobile number is exactly 10 digits long
                        if (!/^\d{10}$/.test(mobileNumber)) {
                            alert("Please enter a valid 10-digit mobile number.");
                            return null; // Return null or another value to indicate validation failure
                        }

                    return mobileNumber;
                }
    }
};
app.initialize();
