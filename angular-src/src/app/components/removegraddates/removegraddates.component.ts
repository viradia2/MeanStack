import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-removegraddates',
  templateUrl: './removegraddates.component.html',
  styleUrls: ['./removegraddates.component.css']
})
export class RemovegraddatesComponent implements OnInit {
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string; //ngmodel class variable value assign
  isadmin : string;
  activeschool : any[];
  activeYears : any[];
  schoolname: string;
  academicyear : string;
  graduationdate : any;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

    this.loadAcademicYears();

    var _countyName;
    var _cName = [];

    this.authService.getProfile().subscribe(profile => {
      if(profile.success){
        this.userid = profile.userinfo.userid;
        this.firstname = profile.userinfo.firstname;
        this.lastname = profile.userinfo.lastname;
        this.countyname = profile.userinfo.countyname;
        this.isadmin = profile.userinfo.isadmin;
        _countyName = profile.userinfo.countyname;
        const cN = {
          countyname : _countyName
        }
        this.authService.getAllActiveSchoolAtCounty().subscribe(data => {
          if(data.success){
            for (var i = 0; i < data.activeschoolnames.length; i++){
              _cName.push(data.activeschoolnames[i]);
              // console.log('academic years: ' + data.activeschoolnames[i]);
            }
            this.activeschool = _cName;
          }else{
            this.flashMessage.show(data.msg, {
              cssClass: 'alert-danger',
              timeout: 5000});
          }
        });
      }else{
        this.flashMessage.show(profile.msg, {
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
  }

  onDeleteGraduationDate(){
    const graduationinfo = {
      countyname : this.countyname,
      schoolname : this.schoolname,
      academicyear : this.academicyear,
    }
    // console.log('cNAme: ' + graduationinfo.countyname);
    //   console.log('SNAme: ' + graduationinfo.schoolname);
    //     console.log('AYear: ' + graduationinfo.academicyear);
    if("undefined" !== typeof graduationinfo.schoolname && "undefined" !== typeof graduationinfo.academicyear){
      this.authService.deleteGraduationDate(graduationinfo).subscribe(data => {
        if(data.success){
          this.flashMessage.show('You have deleted graduation date successfully.', {
           cssClass: 'alert-success',
           timeout: 5000
          });
          this.router.navigate(['addgraduationinfo/removegraddates']);
        }
        else{
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['addgraduationinfo/removegraddates']);
        }
      });
    }else{
      this.flashMessage.show('Please enter/select values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
      this.router.navigate(['addgraduationinfo/removegraddates']);
    }
  }
}
