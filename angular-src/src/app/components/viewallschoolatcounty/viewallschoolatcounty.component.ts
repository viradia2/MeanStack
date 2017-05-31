import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-viewallschoolatcounty',
  templateUrl: './viewallschoolatcounty.component.html',
  styleUrls: ['./viewallschoolatcounty.component.css']
})
export class ViewallschoolatcountyComponent implements OnInit {
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string; //ngmodel class variable value assign
  isadmin : string;
  schoolnamesandisactivestatus : any;
  gSchoolData : any[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(data => {
      if(data.success){
        this.userid = data.userinfo.userid;
        // console.log('userid: ' + data.userinfo.userid);
        this.firstname = data.userinfo.firstname;
        this.lastname = data.userinfo.lastname;
        this.countyname = data.userinfo.countyname;
        this.isadmin = data.userinfo.isadmin;
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });

      var _getSchoolData = [];
      this.authService.viewAllSchoolAtCounty().subscribe(data => {
        if(data.success){
          this.schoolnamesandisactivestatus = data.schoolnamesandisactivestatus;
          for (var i = 0; i < this.schoolnamesandisactivestatus.length; i++){
            var schoolName = this.schoolnamesandisactivestatus[i].schoolname;
            var isActive = this.schoolnamesandisactivestatus[i].isactive;
            if(isActive == 'Y'){
              isActive = "Yes";
            }
            else{
              isActive = "No";
            }
            var schoolDataObj = new SchoolDataCountyWise(schoolName, isActive);
            _getSchoolData.push(schoolDataObj);
          }
          this.gSchoolData = _getSchoolData;
        }else{
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
        }
      });
  }
}

export class SchoolDataCountyWise{
  schoolname : string;
  isactive : any;

  constructor(_schoolname: string, _isactive: any) {
     this.schoolname=_schoolname;
     this.isactive = _isactive;
  }
}
