import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
     private authService:AuthService,
     private router:Router,
     private flashMessage:FlashMessagesService
   ){}

  userinfo: any;
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string;
  isadmin : string;
  gisAdmin : any;

  canActivate(url){
    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile => {
        if(profile.success){
          this.isadmin = profile.userinfo.isadmin;
          // console.log('isadMin-->' + this.isadmin);
          // console.log('router-->' + this.router.url);
          if(this.isadmin == 'Y'){
            if(this.router.url == '/addgraduationinfo'){
              this.router.navigate(['/dashboard']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/addgraduationinfo/viewallschoolatcounty'){
              this.router.navigate(['/dashboard']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/addgraduationinfo/viewsubmittedgraddates'){
              this.router.navigate(['/dashboard']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/addgraduationinfo/submitchangegraddate'){
              this.router.navigate(['/dashboard']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/addgraduationinfo/removegraddates'){
              this.router.navigate(['/dashboard']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            return true;
          }else{
            if(this.router.url == '/dashboard'){
              this.router.navigate(['addgraduationinfo']);
              // this.flashMessage.show("You don't have access to this URL.", {
              //   cssClass: 'alert-danger',
              //   timeout: 3000});
              return false;
            }
            if(this.router.url == '/dashboard/report'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/dashboard/report/report1'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/dashboard/report/report2'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/dashboard/report/report3'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/viewallschool'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/dashboard/manageuser'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/dashboard/manageschools'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageschools/viewallschools'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageschools/addnewschool'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageschools/updateschoolname'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageschools/activeateinactivateschool'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageuser/getalluserinfo'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageuser/changeotheruserpassword'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageuser/adduserinfo'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
            if(this.router.url == '/manageuser/updatedeleteuser'){
              this.router.navigate(['addgraduationinfo']);
              this.flashMessage.show("You don't have access to this URL.", {
                cssClass: 'alert-danger',
                timeout: 3000});
              return false;
            }
          return true;
          }
        }else{
          this.flashMessage.show(profile.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
        }
      });
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }


}
