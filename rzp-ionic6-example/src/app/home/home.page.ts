import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  pay() {
    var options = {
      description: 'Test Payment',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_8TwYd9kYmOeuuu',
      amount: '100',
      name: 'Shikhar',
      prefill: {
        email: 'shikhar.singhal@razorpay.com',
        contact: '9999899962',
        name: 'Shikhar Singhal'
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
