import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string; //ngmodel class variable value assign
  isadmin : string;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      if(profile.success){
        this.userid = profile.userinfo.userid;
        this.firstname = profile.userinfo.firstname;
        this.lastname = profile.userinfo.lastname;
        this.countyname = profile.userinfo.countyname;
        this.isadmin = profile.userinfo.isadmin;
        if(this.isadmin == "Y"){
          this.isadmin = "Yes";
        }else{
          this.isadmin = "No";
        }
      }else{
        this.flashMessage.show(profile.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });

  }

  onUpdateProfile(){
    const user={
      firstname: this.firstname,
      lastname: this.lastname,
    }
    if(!this.validateService.validateFName(user.firstname)){
      this.flashMessage.show('Please enter a valid firstname.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateLName(user.lastname)){
      this.flashMessage.show('Please enter a valid lastname.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if("undefined" !== typeof user.firstname && user.firstname !== "" &&
       "undefined" !== typeof user.lastname && user.lastname !== ""){
         this.authService.updatemyProfile(user).subscribe(data => {
           if(data.success){
             this.flashMessage.show('Your profile has been updated.', {
               cssClass: 'alert-success',
               timeout: 5000});
             this.router.navigate(['profile']);
           } else {
             this.flashMessage.show(data.msg, {
               cssClass: 'alert-danger',
               timeout: 5000});
             this.router.navigate(['profile/updateprofile']);
           }
         });
       }else{
         this.flashMessage.show("Please enter/select values.", {
           cssClass: 'alert-danger',
           timeout: 5000});
       }


    }
}
