import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  imageUrl:String;
  companyName:String;
  inputColor:String;
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

  checkColor(inputColor:String){
    this.inputColor = inputColor;
  }

  saveSettings(){
     var settings = {
        'imageUrl':this.imageUrl,
        'companyName':this.companyName,
        'inputColor':this.inputColor
     };
     let navigationExtras:NavigationExtras = {
       queryParams:{
         special:JSON.stringify(settings),
         replaceUrl:true
       }
     }
    this.router.navigate(['home'],navigationExtras);
  }


}
