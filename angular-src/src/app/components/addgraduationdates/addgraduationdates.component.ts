import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addgraduationdates',
  templateUrl: './addgraduationdates.component.html',
  styleUrls: ['./addgraduationdates.component.css']
})
export class AddgraduationdatesComponent implements OnInit {
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string;
  isadmin : string;

  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      if(profile.success){
        this.userid = profile.userinfo.userid;
        this.firstname = profile.userinfo.firstname;
        this.lastname = profile.userinfo.lastname;
        this.countyname = profile.userinfo.countyname;
        this.isadmin = profile.userinfo.isadmin;
      }else{
        this.flashMessage.show(profile.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

}
