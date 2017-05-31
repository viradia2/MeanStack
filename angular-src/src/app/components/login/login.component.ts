import { Component, ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Globals } from '../../services/globals';
// import { SweetAlertService } from 'ng2-sweetalert2';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('popup1') popup1: Popup;

  username : string;
  password : string;
  isadmin : string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private globals : Globals
  ) { }

  ngOnInit() {

  }

  onForgotCredentialsClick(){
    this.popup1.options = {
        header: "Forgot credentials?",
        color: "black", // red, blue....
        widthProsentage: 30, // The with of the popup measured by browser width
        animationDuration: 1, // in seconds, 0 = no animation
        showButtons: false, // You can hide this in case you want to use custom buttons
        animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
      };
      this.popup1.show(this.popup1.options);
  }

  onOk(){
    this.popup1.hide();
  }

  onLoginSubmit(){
      const user = {
       userid: this.username,
       password: this.password
     }

     if("undefined" !== typeof user.userid && user.userid != "" &&
        "undefined" !== typeof user.password && user.password != ""){
       this.authService.authenticateUser(user).subscribe(data => {
         if(data.success){
            this.authService.storeUserToken(data.token);
            this.authService.getProfile().subscribe(userinfo => {
              if(userinfo.userinfo.isadmin === 'Y'){
                this.globals.isAdmin = 'Y';
                this.flashMessage.show('You are logged in.', {
                 cssClass: 'alert-success',
                 timeout: 5000});
                this.router.navigate(['dashboard']);
              }else{
                this.globals.isAdmin = userinfo.userinfo.isadmin;
                this.flashMessage.show('You are logged in.', {
                 cssClass: 'alert-success',
                 timeout: 5000});
                this.router.navigate(['addgraduationinfo']);
              }
            });
            }else {
                this.flashMessage.show(data.msg, {
                  cssClass: 'alert-danger',
                  timeout: 5000});
                this.router.navigate(['']);
              }
            });
     }else{
       this.flashMessage.show('Please enter all values.', {
         cssClass: 'alert-danger',
         timeout: 5000});
       this.router.navigate(['']);
     }

  }

}
