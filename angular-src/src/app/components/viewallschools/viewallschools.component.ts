import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-viewallschools',
  templateUrl: './viewallschools.component.html',
  styleUrls: ['./viewallschools.component.css']
})
export class ViewallschoolsComponent implements OnInit {
  schoolcountywise : any;
  gallSchool : any[];
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

    var _listallSchoolObj=[];

    this.authService.getAllSchool().subscribe(data => {
      if(data.success){
        this.schoolcountywise = data.schoolnamesandisactivestatuscountywise;
        for (var i = 0; i < this.schoolcountywise.length; i++){
          var _allSchoolObj=[];
          var _isactiveObj = [];
          for (var j = 0; j < this.schoolcountywise[i].countschools; j++){
            var countyName = this.schoolcountywise[i]._id.countyname;
            var schoolAndIsActivestatus = this.schoolcountywise[i].schoolsandisactivestatus[j].split(":");
            var _SchoolObj = new AllSchool(schoolAndIsActivestatus[0],schoolAndIsActivestatus[1],countyName);
            _allSchoolObj.push(_SchoolObj);
          }
          var listCountySchool = new AllCountySchool(this.schoolcountywise[i]._id.countyname, _allSchoolObj);
          _listallSchoolObj.push(listCountySchool);
        }
        this.gallSchool = _listallSchoolObj;
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
    this.countyname = _countyname;
    // this.isactive = _isactive;
    this.schools = _listSchools;
  }
}

export class AllSchool{
  schoolsandisactivestatus : any;
  countyname : string;
  isactive : any;

  constructor(_schoolsandisactivestatus: any, _isactive: any, _countyname: string) {
     this.schoolsandisactivestatus=_schoolsandisactivestatus;
     if(_isactive == " Y"){
      this.isactive = "Yes";
     }else{
      this.isactive = "No";
     }
    //  this.isactive = _isactive;
     this.countyname = _countyname;
  }
}
