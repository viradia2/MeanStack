import { Component, ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import {Popup} from 'ng2-opd-popup';

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import {MyUser} from '../getalluserinfo/getalluserinfo.component';
// ../components/getalluserinfo/getalluserinfo.component
@Component({
  selector: 'app-updatedeleteuser',
  templateUrl: './updatedeleteuser.component.html',
  styleUrls: ['./updatedeleteuser.component.css']
})

//implements OnInit
export class UpdatedeleteuserComponent  {

   @ViewChild('popup1') popup1: Popup;

  showName: boolean[];
  userinfo : any;
  usersinfo : any;
  countyname : string;
  tempcountyname : any;
  _user : any;
  _gusers : string[];
  _gusersObj : any[];
  listCounty:any[];
  uId : any;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    public modal: Modal,
  ) {
    }

  ngOnInit() {

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

    var _users=[];
    var _usersObj=[];
    var _showName=[];

    //console.log('gealluser userid: ' + user.userid);
    this.authService.getAllUserInfo().subscribe(data => {
      if(data.success){
        this.userinfo = data.data;
        for (var i = 0; i < this.userinfo.length; i++) {
          for(var j=0;j<this.userinfo[i].userscount;j++){
            var tempuser = this.userinfo[i].usersinfo[j].userid;
            var tcounty = this.userinfo[i]._id.countyname;
            // console.log('county name: ' + tcounty);
            var tfn = this.userinfo[i].usersinfo[j].firstname;
            var tln = this.userinfo[i].usersinfo[j].lastname;
            var tisa = this.userinfo[i].usersinfo[j].isadmin;
            // console.log('-'+tempuser);
            var _userObj = new MyUser(tempuser,tfn,tln,tisa,tcounty);
            _usersObj.push(_userObj);
            _users.push(tempuser);
            _showName.push(false);
            this._user = tempuser;
          }
        }
        this._gusers = _users;
        this._gusersObj = _usersObj;
        this.showName = _showName;
        // console.log('All-'+  this._gusers);
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

  onDeleteUser(i){
    const user = {
      userid: this._gusersObj[i].userid
    }

    this.uId = user.userid;
    this.popup1.options = {
      header: "Delete User",
      color: "black", // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Delete", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-danger", // your class for styling the confirm button
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
    this.popup1.show(this.popup1.options);

  //  console.log('deleteuser : ' + user.userid);
  }

   YourConfirmEvent(){
    const user = {
      userid: this.uId
    }
    // console.log('useid: '+ user.userid);

    this.authService.deleteLoginUser(user).subscribe(data => {
      if(data.success){
        this.authService.deleteUser(user).subscribe(data => {
            if(data.success){
              this.flashMessage.show('User is deleted.', {
                cssClass: 'alert-success',
                timeout: 5000});
              this.router.navigate(['manageuser/updatedeleteuser']);
            } else {
              this.flashMessage.show(data.msg, {
                cssClass: 'alert-danger',
                timeout: 5000});
              this.router.navigate(['manageuser/updatedeleteuser']);
            }
            location.reload();
              // this.router.navigate(['manageuser/updatedeleteuser']);
          });
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['manageuser/updatedeleteuser']);
      }
    });

      this.popup1.hide();
  }



  enableUpdateFields(i){
  //first click enable text box
    if(this.showName[i]){
        this.onUpdateUser(i);
    }
    this.showName[i] = true;
  }

  onUpdateUser(i){
    var tempcountyname;
    if(this._gusersObj[i].isadmin == 'Y'){
      tempcountyname = 'AllCounties';
    }else{
      if("undefined" === typeof this._gusersObj[i].countyname || this._gusersObj[i].countyname === "" ||
        this._gusersObj[i].countyname == "AllCounties") {
        this.flashMessage.show('Please select a county for the non-admin user.', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
      tempcountyname = this._gusersObj[i].countyname;
    }

    const user = {
      userid: this._gusersObj[i].userid,
      firstname : this._gusersObj[i].firstname,
      lastname : this._gusersObj[i].lastname,
      countyname : tempcountyname,
      isadmin : this._gusersObj[i].isadmin
    }

    if(!this.validateService.validateFName(user.firstname)){
      this.flashMessage.show('Please use a valid firstname', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateLName(user.lastname)){
      this.flashMessage.show('Please use a valid lastname', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // console.log('updateuser : ' + user.userid);
    if("undefined" !== typeof user.firstname && user.firstname !== "" &&
       "undefined" !== typeof user.lastname && user.lastname !== ""){
          this.authService.updateUser(user).subscribe(data => {
            if(data.success){
              this.flashMessage.show('User is updated.', {
                cssClass: 'alert-success',
                timeout: 5000});
              this.router.navigate(['manageuser/updatedeleteuser']);
            } else {
              this.flashMessage.show(data.msg, {
                cssClass: 'alert-danger',
                timeout: 5000});
              this.router.navigate(['manageuser/updatedeleteuser']);
            }
          });
          location.reload();
        }else{
          this.flashMessage.show('Please enter/select values.', {
            cssClass: 'alert-danger',
            timeout: 5000});
        }
    }
}
