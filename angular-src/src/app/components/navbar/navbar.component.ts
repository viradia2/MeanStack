import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Globals } from '../../services/globals';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isadmin : string;

  constructor(
   private authService:AuthService,
   private router:Router,
   private flashMessage:FlashMessagesService,
   private globals : Globals
  ) { }

  ngOnInit() {

  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out.', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['']);
    return false;
  }

  onDashboardClick(){
    this.authService.getProfile().subscribe(profile => {
      this.isadmin = profile.userinfo.isadmin;
      if(this.isadmin == 'Y'){
        this.router.navigate(['dashboard']);
      }else{
        this.router.navigate(['addgraduationinfo']);
      }
    });
  }
}
