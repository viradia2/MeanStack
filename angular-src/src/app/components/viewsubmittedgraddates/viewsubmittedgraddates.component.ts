import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-viewsubmittedgraddates',
  templateUrl: './viewsubmittedgraddates.component.html',
  styleUrls: ['./viewsubmittedgraddates.component.css']
})
export class ViewsubmittedgraddatesComponent implements OnInit {
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string; //ngmodel class variable value assign
  isadmin : string;
  listYear:any[];
  academicyear : any;
  schoolnamesandgraduationdate : any;
  getGraduationData : any[];
  activeYears : any[];

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
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

    var _listYear=[];
    this.authService.getAllAcademicYearsExists().subscribe(academicyears => {
      if(academicyears.success){
        var academicY = [];
        academicY = this.loadAcademicYears();

        for (var i = 0; i < academicyears.academicyears.length; i++) {
          _listYear.push(academicyears.academicyears[i]);
          // console.log('Years: ' + academicyears.academicyears[i]);
        }

        var setYear = new Set();
        for(var l=0;l<academicY.length;l++){
          setYear.add(academicY[l]);
        }
        for(var k=0; k<_listYear.length; k++){
          setYear.add(_listYear[k]);
        }
        _listYear = Array.from(setYear);

        this.listYear = _listYear.sort();
      }else{
        this.flashMessage.show(academicyears.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });

  }

  loadAcademicYears(){
    var aYear = [];
    var d = new Date();
    var prev = d.getFullYear()-1 + '-' + d.getFullYear().toString().substr(-2);
    var next = d.getFullYear() + '-' + (d.getFullYear()+1).toString().substr(-2);
    aYear.push(prev);
    aYear.push(next);
    this.activeYears = aYear;
    return this.activeYears;
  }

  onGetData(){
    const aYear = {
      academicyear : this.academicyear
    }
    // console.log('ac year: ' + aYear.academicyear);

      var _getGraduationData = [];

      if(aYear.academicyear != undefined){
        this.authService.getsubmittedgradDates(aYear).subscribe(data => {
          if(data.success){
            this.schoolnamesandgraduationdate = data.schoolnamesandgraduationdate;
            for (var i = 0; i < this.schoolnamesandgraduationdate.length; i++){
              var schoolName = this.schoolnamesandgraduationdate[i].schoolname;
              var graduationDate = this.schoolnamesandgraduationdate[i].graduationinfo.graduationdate;
              var graduationdataObj = new GraduationData(schoolName, graduationDate);
              _getGraduationData.push(graduationdataObj);
            }
            this.getGraduationData = _getGraduationData;
            // console.log('gdata: ' + this.getGraduationData);
          }else{
            this.flashMessage.show(data.msg, {
              cssClass: 'alert-danger',
              timeout: 5000});
          }
        });
      }else{
        this.flashMessage.show('Please select/enter values.', {
          cssClass: 'alert-danger',
          timeout: 5000});
      }

  }

}

export class GraduationData{
  schoolname : string;
  graduationdate : any;

  constructor(_schoolname: string, _graduationdate: any) {
     this.schoolname=_schoolname;
     this.graduationdate = _graduationdate.substring(0,10);
  }
}
