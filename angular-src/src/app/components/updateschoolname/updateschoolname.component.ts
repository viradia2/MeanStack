import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-updateschoolname',
  templateUrl: './updateschoolname.component.html',
  styleUrls: ['./updateschoolname.component.css']
})
export class UpdateschoolnameComponent implements OnInit {
  listCounty:any[];
  countyname : string;
  newschoolname : string;
  oldschoolname : string;
  schoollist : any[];
  showDropDown : boolean;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.showDropDown = true;
    var _listCounty=[];
    this.authService.getAllCountyName().subscribe(data => {
      if(data.success){
        for (var i = 0; i < data.countynames.length; i++) {
          _listCounty.push(data.countynames[i]);
        }
        this.listCounty = _listCounty;
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });

  }

  onCountySelect(countyname){
    // console.log('select');
    const schoolDetail = {
      countyname : this.countyname
    }
    this.showDropDown = false;
    var _schoolnames = [];
    this.authService.getallschoolnamesatcounty(schoolDetail).subscribe(data => {
      if(data.success){
        for (var i = 0; i < data.schoolnames.length; i++) {
          _schoolnames.push(data.schoolnames[i]);
        }
        this.schoollist = _schoolnames;
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

  onUpdateSchool(){
    const schoolChangeDetail = {
      oldschoolname : this.oldschoolname,
      countyname : this.countyname,
      newschoolname : this.newschoolname
    }

    if(!this.validateService.validateSchoolName(schoolChangeDetail.newschoolname)){
      this.flashMessage.show('Use valid school name', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(this.validateService.validateUpdateSchoolName(schoolChangeDetail)){
      this.authService.changeSchoolName(schoolChangeDetail).subscribe(data => {
        if(data.success){
          this.flashMessage.show('You have changed school name successfully.', {
           cssClass: 'alert-success',
           timeout: 5000
          });
          this.router.navigate(['dashboard/manageschools']);
        }else{
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['manageschools/updateschoolname']);
        }
      });
    }else{
      this.flashMessage.show('Please enter/select values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
      this.router.navigate(['manageschools/updateschoolname']);
    }
  }

}
