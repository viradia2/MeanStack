import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string; //ngmodel class variable value assign
  isadmin : string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) {}

  ngOnInit() {

    this.authService.getProfile().subscribe(data => {
      if(data.success){
        this.userid = data.userinfo.userid;
        this.firstname = data.userinfo.firstname;
        this.lastname = data.userinfo.lastname;
        this.countyname = data.userinfo.countyname;
        this.isadmin = data.userinfo.isadmin;
        if(this.isadmin == "Y"){
          this.isadmin = "Yes";
        }else{
          this.isadmin = "No";
        }
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }
}
