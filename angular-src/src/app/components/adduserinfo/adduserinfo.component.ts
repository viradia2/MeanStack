import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';


@Component({
  selector: 'app-adduserinfo',
  templateUrl: './adduserinfo.component.html',
  styleUrls: ['./adduserinfo.component.css']
})
export class AdduserinfoComponent implements OnInit {
  userid : string;
  password : string;
  firstname : string;
  lastname : string;
  countyname : string;
  isadmin : string;
  showDropDown: boolean = false;
  listCounty:any[];

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.isadmin = 'N';
    this.isDisable(false);
    this.countyname = 'AllCounties';

    var _listCounty=[];
    this.authService.getAllCountyName().subscribe(data => {
      if(data.success){
        for (var i = 0; i < data.countynames.length; i++) {
          _listCounty.push(data.countynames[i]);
        }
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
      // console.log('county list: ' + data.countynames);
    });

    this.listCounty = _listCounty;
  }

  onAddUserSubmit(){

      var tempcname;
      if(this.isadmin == 'Y'){
        tempcname = 'AllCounties';
      }else{
        tempcname = this.countyname;
      }
     const user = {
       userid: this.userid,
       password: this.password,
       firstname: this.firstname,
       lastname: this.lastname,
       countyname: tempcname,
       isadmin: this.isadmin
     }

     if(!this.validateService.validateEmail(user.userid)){
       this.flashMessage.show('Please use a valid userid.', {cssClass: 'alert-danger', timeout: 3000});
       return false;
     }
     if(!this.validateService.validateFName(user.firstname)){
       this.flashMessage.show('Please use a valid firstname.', {cssClass: 'alert-danger', timeout: 3000});
       return false;
     }
     if(!this.validateService.validateLName(user.lastname)){
       this.flashMessage.show('Please use a valid lastname.', {cssClass: 'alert-danger', timeout: 3000});
       return false;
     }

     if(this.validateService.validateAddUser(user) == true){
       this.authService.addUser(user).subscribe(data => {
       if(data.success){
         this.authService.addUserinfo(user).subscribe(data =>{
            if(data.success){
              this.router.navigate(['dashboard/manageuser']);
              this.flashMessage.show('You have added user successfully.', {
               cssClass: 'alert-success',
               timeout: 5000
              });
            } else {
              this.flashMessage.show(data.msg, {
                cssClass: 'alert-danger',
                timeout: 5000});
              this.router.navigate(['manageuser/adduserinfo']);
            }
         });
       } else {
         this.flashMessage.show(data.msg, {
           cssClass: 'alert-danger',
           timeout: 5000});
         this.router.navigate(['manageuser/adduserinfo']);
       }
     });
     }else{
       this.flashMessage.show('Please enter/select values.', {
         cssClass: 'alert-danger',
         timeout: 5000});
       this.router.navigate(['manageuser/adduserinfo']);
     }

  }

  isDisable(flag){
    if(flag){
      this.showDropDown = true;
    }else{
      this.showDropDown = false;
    }
  }
}
