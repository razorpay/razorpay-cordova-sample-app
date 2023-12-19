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


//Standard Checkout without Turbo Payload
/*var rzpOptions = {
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
};*/

//UAT - key: "rzp_test_0wFRWIZnH65uny"
//MOCK - key: "rzp_test_vacN5cmVqNIlhO"
//Non TPV Payload
 /*var rzpOptions = {
        key: "rzp_test_vacN5cmVqNIlhO",
        amount: 2000,
        currency: "INR",
        prefill: {
            contact: "9876543210",
            email: "azhar.ali@razorpay.com"
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
};*/

//TPV Payload
//UAT - key: "rzp_test_5sHeuuremkiApj"
//MOCK - key: "rzp_test_vacN5cmVqNIlhO"
var rzpOptions = {
        key: "rzp_test_5sHeuuremkiApj",
        amount: 2000,
        currency: "INR",
        prefill: {
            contact: "9876543210",
            email: "azhar.ali@razorpay.com"
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
        order_id: "order_N8cKZHHrWPDNzN",
        ep: "https://api-web-turbo-upi.ext.dev.razorpay.in/test/checkout.html?branch=feat/turbo/tpv"
};


var successCallback = function(response) {
  alert("Payment Successful!! \n"+JSON.stringify(response))
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
        let order_id = getAndValidateOrderId()
        if(mobileNumber!==null && order_id!=null){
        rzpOptions.prefill.contact = mobileNumber
        rzpOptions.order_id = order_id
                    RazorpayCheckout.open(rzpOptions, successCallback, cancelCallback);
                    event.preventDefault();
        }
        })

        document.getElementById('link-new-upi-account').addEventListener('click', function (event) {
        showLoader();
           let mobileNumber = getAndValidateMobileNumber();
            let color = "#063970"
            if(mobileNumber!==null){
            console.log("mobile number is : "+mobileNumber)
           RazorpayCheckout.upiTurbo.linkNewUpiAccount(mobileNumber, color,
           function (response){
              hideLoader();
              console.log(response)
              try {
                 var jsonArray = JSON.parse(response);
                 if(jsonArray && jsonArray.length>0){
                 alert("Account linked Successfully!! \n\n\n Account List JSON Data:- \n\n"+response)
                 }
                 else{
                 alert("No linked accounts found, try with another bank or number!")
                 }
                  } catch (error) {
                        // Handle parsing error
                           console.error('Error parsing JSON array:', error);
                    }
           },
            function(error){
               hideLoader();
               alert(JSON.stringify(error))
            })
            }
        })
        document.getElementById('init-turbo').addEventListener('click', function (event){

        let key = "rzp_test_5sHeuuremkiApj";
            RazorpayCheckout.initUpiTurbo(key)
            alert("Turbo is initialized")
        })

        document.getElementById('manage-upi-accounts').addEventListener('click', function (event) {
            let mobileNumber = getAndValidateMobileNumber()
            let color = "#063970"
             if(mobileNumber!==null){
             RazorpayCheckout.upiTurbo.manageUpiAccounts(mobileNumber, color, function(error){
                              alert(JSON.stringify(error))
                         })
             }
        })

        function showLoader() {
            document.getElementById('loading-bar-spinner').style.display = 'flex';
        }

        // Function to hide the loader
        function hideLoader() {
            document.getElementById('loading-bar-spinner').style.display = 'none';
        }

        function getAndValidateMobileNumber() {
                    let mobileNumber = document.getElementById('mobileNumber').value;

                    // Validate if the mobile number is exactly 10 digits long
                        if (!/^\d{10}$/.test(mobileNumber)) {
                        hideLoader();
                            alert("Please enter a valid 10-digit mobile number.");
                            return null; // Return null or another value to indicate validation failure
                        }

                    return mobileNumber;
        }

        function getAndValidateOrderId() {
                            let order_id = document.getElementById('order-id').value;

                            // Validate orderID
                                /*if (order_id == null || order_id.trim() == '') {
                                hideLoader();
                                    alert("Please enter Order ID.");
                                    return null;
                                }*/

                            return order_id;
                }
    }
};
app.initialize();
