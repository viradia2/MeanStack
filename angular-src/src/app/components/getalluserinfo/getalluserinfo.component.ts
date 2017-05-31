import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';



@Component({
  selector: 'app-getalluserinfo',
  templateUrl: './getalluserinfo.component.html',
  styleUrls: ['./getalluserinfo.component.css']
})

export class GetalluserinfoComponent implements OnInit {
  userinfo : any;
  usersinfo : any;
  _user : any;
  _gusers : string[];
  _gusersObj : any[];
  _gallData : any[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) {

   }

  ngOnInit() {

    var _users=[];

    var _listallUserObj=[];

    this.authService.getAllUserInfo().subscribe(data => {
      if(data.success){
        this.userinfo = data.data;
        for (var i = 0; i < this.userinfo.length; i++) {
          var _usersObj=[];
          for(var j=0;j<this.userinfo[i].userscount;j++){
            var tempuser = this.userinfo[i].usersinfo[j].userid;
            var tcounty = this.userinfo[i]._id.countyname;
            //  console.log('county name: ' + tcounty);
            var tfn = this.userinfo[i].usersinfo[j].firstname;
            var tln = this.userinfo[i].usersinfo[j].lastname;
            var tisa = this.userinfo[i].usersinfo[j].isadmin;
            // if(tcounty === "AllCounties"){
            //   tcounty = "Admin";
            //   console.log('county: ' + tcounty);
            // }
            // console.log('-'+tempuser);
            var _userObj = new MyUser(tempuser,tfn,tln,tisa,tcounty);
            _usersObj.push(_userObj);
            _users.push(tempuser);
            this._user = tempuser;
          }
          var listUsers = new AllCountySchool(this.userinfo[i]._id.countyname, _usersObj);
          _listallUserObj.push(listUsers);
        }
        this._gallData = _listallUserObj;
        // this._gusers = _users;
        // this._gusersObj = _usersObj;
        // console.log('All-'+  this._gusers);
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }
}

export class AllCountySchool{
  countyname : string;
  schools : any[];
  isactive : any[];

  constructor(_countyname: string, _listSchools: any[]){
    if(_countyname === "AllCounties"){
      this.countyname = "(Admins) AllCounties";
    }else{
      this.countyname = _countyname;
    }
    // this.isactive = _isactive;
    this.schools = _listSchools;
  }
}

export class MyUser{
  userid : string;
  firstname : string;
  lastname : string;
  isadmin : string;
  countyname : string;

  constructor(_userid: string, _firstname: string,
   _lastname: string, _isadmin: string, _countyname: string) {
     this.userid=_userid;
     this.firstname = _firstname;
     this.lastname = _lastname;
     this.isadmin = _isadmin;
     this.countyname = _countyname;
  }
}
