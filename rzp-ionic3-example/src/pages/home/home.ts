import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pay() {
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
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
      alert('payment_id: ' + payment_id);
      //Navigate to another page using the nav controller
      //this.navCtrl.setRoot(SuccessPage)
      //Inject the necessary controller to the constructor
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
      //Navigate to another page using the nav controller
      //this.navCtrl.setRoot(ErrorPage)
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
}
