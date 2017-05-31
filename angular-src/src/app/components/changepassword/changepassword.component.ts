import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';

import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  userid : string;
  password : string;
  newpassword : string;
  confirmpassword : string;
  firstname : string;
  lastname : string;
  countyname : string;
  isadmin : string;
  currentpassword : string;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(data => {
      if(data.success){
        this.userid = data.userinfo.userid;
        this.firstname = data.userinfo.firstname;
        this.lastname = data.userinfo.lastname;
        this.countyname = data.userinfo.countyname;
        this.isadmin = data.userinfo.isadmin;
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

  onChangePassword(){
    const user = {
     userid: this.userid,
     password: this.password
    }

    const oldUser = {
      userid : this.userid,
      password : this.currentpassword
    }

    const password = {
      password: this.password
    }

    const user2 = {
      newpassword: this.password,
      confirmpassword: this.confirmpassword
    }
    // const password = {
    //   password: this.newpassword
    // }


    if(this.validateService.validatePassword(user2) == false){
      // console.log('true or false: ' + this.validateService.validateRegister(user));
      this.flashMessage.show('New Password and Confirm Password should be same.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if("undefined" !== typeof oldUser.password && oldUser.password !== "" &&
      "undefined" !== typeof user2.newpassword && user2.newpassword !== "" &&
      "undefined" !== typeof user2.confirmpassword && user2.confirmpassword !== "") {
        this.authService.authenticateUser(oldUser).subscribe(data => {
          if(data.success){
            this.authService.changePassword(password).subscribe(data => {
              if(data.success){
                this.flashMessage.show('Your password has been changed.', {
                  cssClass: 'alert-success',
                  timeout: 5000});
                  // call login/authenticate with userid and newPassword.
                  this.authService.authenticateUser(user).subscribe(data => {
                    if(data.success){
                      this.authService.storeUserToken(data.token);
                      this.router.navigate(['profile']);
                    }else{
                      this.flashMessage.show(data.msg, {
                        cssClass: 'alert-danger',
                        timeout: 5000});
                      this.router.navigate(['profile/changepassword']);
                    }
                  });
              } else {
                this.flashMessage.show(data.msg, {
                  cssClass: 'alert-danger',
                  timeout: 5000});
                this.router.navigate(['profile/changepassword']);
              }
            });
          }else{
            if(data.msg == "Incorrect password.") {
              this.flashMessage.show("Please enter correct current password.", {
                cssClass: 'alert-danger',
                timeout: 5000});
            }
            else {
              this.flashMessage.show(data.msg, {
                cssClass: 'alert-danger',
                timeout: 5000});
            }
          }
        });
    }else{
      this.flashMessage.show('Please enter all values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
    }

  }

}
