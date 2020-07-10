import { Component } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ActivatedRoute, Router } from '@angular/router';

declare var RazorpayCheckout:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data:any;
  imageUrl:String;
  companyName:String;
  color:String;


  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params=>{
      if(params && params.special){
          this.data = JSON.parse(params.special);
      }
    });
  }

  payWithRazorpay() {
    console.log("getting here");
    if(this.data){
    if(this.data.imageUrl){
      this.imageUrl = this.data.imageUrl;
    }else{
      this.imageUrl = "https://s3.amazonaws.com/rzp-mobile/images/rzp.png";
    }
    if(this.data.companyName){
      this.companyName = this.data.companyName;
    }else{
      this.companyName = "Razorpay Online Store"
    }
    if(this.data.inputColor){
      this.color = this.data.inputColor;
    }else{
      this.color = "#2B4486";
    }
  }
    var options = {
      description: 'Credits towards consultation',
      image: this.imageUrl,
      currency: "INR", // your 3 letter currency code
      key: "rzp_test_1DP5mmOlF5G5ag", // your Key Id from Razorpay dashboard
      amount: 100, // Payment amount in smallest denomiation e.g. cents for USD
      name: this.companyName,
      theme:{
        color:this.color
      },
      prefill: {
        email: 'test@razorpay.com',
        contact: '9990009991',
        name: 'Razorpay'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };
    console.log(JSON.stringify(options));
    var successCallback = function (payment_id) {
      alert('payment_id: ' + payment_id);
      this.router.navigate(['home'],{replaceUrl:true});
    };

    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')');
      this.router.navigate(['home'],{replaceUrl:true});

    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }

}
