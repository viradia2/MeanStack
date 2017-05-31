import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string;
  isadmin : string;
  gisAdmin : any;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
      // const user = {
      //   userid : this.authService.userid
      // }
      // console.log('in ngOninti profile:--)' + this.authService.userid);
      // console.log('here');

      this.authService.getProfile().subscribe(profile => {
        if(profile.success){
          this.userid = profile.userinfo.userid;
          // console.log('Hello' + this.userid);
          this.firstname = profile.userinfo.firstname;
          this.lastname = profile.userinfo.lastname;
          this.countyname = profile.userinfo.countyname;
          this.isadmin = profile.userinfo.isadmin;
          var isadmin = this.isadmin;
        }else{
          this.flashMessage.show(profile.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
        }
        this.gisAdmin = isadmin;
        // console.log('Hello' + this.gisAdmin);
        if(this.validateService.canAccess(this.gisAdmin) == true){
          // console.log('Hello');
        }
      });


      // console.log('Hello' + this.gisAdmin);
      // if(this.validateService.canAccess(this.gisAdmin) == true){
      //   console.log('Hello');
      // }
  }
}
