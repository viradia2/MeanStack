import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';

import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-changeotheruserpassword',
  templateUrl: './changeotheruserpassword.component.html',
  styleUrls: ['./changeotheruserpassword.component.css']
})
export class ChangeotheruserpasswordComponent implements OnInit {

  userid : string;
  newpassword : string;
  confirmpassword : string;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

  }

  onSubmitPassword(){
    const user = {
     userid: this.userid,
     password: this.newpassword
    }
    const userid = {
      userid : this.userid
    }

    const user2 = {
      newpassword: this.newpassword,
      confirmpassword: this.confirmpassword
    }

    if(!this.validateService.validateEmail(user.userid)){
      this.flashMessage.show('Please enter a valid Userid.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(this.validateService.validatePassword(user2) == false){
      // console.log('true or false: ' + this.validateService.validateRegister(user));
      this.flashMessage.show('New Password and Confirm Password should be same.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    /* if(user2.newpassword != undefined && user2.confirmpassword != undefined &&
      user2.newpassword !== "" && user2.confirmpassword !== ""){ */
    if("undefined" !== typeof user2.newpassword && user2.newpassword !== "" &&
      "undefined" !== typeof user2.confirmpassword && user2.confirmpassword !== "") {
          this.authService.doesUserIdExists(userid).subscribe(data => {
            if(data.success){
              this.authService.changePasswordforOtherUser(user).subscribe(data => {
                if(data.success){
                  this.authService.userid = data.userid;
                  this.flashMessage.show('You have changed password for other user.', {
                    cssClass: 'alert-success',
                    timeout: 5000});
                  this.router.navigate(['dashboard/manageuser']);
                } else {
                  this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000});
                  this.router.navigate(['manageuser/changeotheruserpassword']);
                }
              });
            }else{
              this.flashMessage.show(data.msg, {
                cssClass: 'alert-danger',
                timeout: 5000});
              this.router.navigate(['manageuser/changeotheruserpassword']);
            }
          });
        }else{
          this.flashMessage.show('Please enter New Password and Confirm Password.', {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['manageuser/changeotheruserpassword']);
        }

  }


}
