import { Component, ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-activateinactivateschool',
  templateUrl: './activateinactivateschool.component.html',
  styleUrls: ['./activateinactivateschool.component.css']
})
//implements OnInit
export class ActivateinactivateschoolComponent  {

  @ViewChild('popup1') popup1: Popup;

  listCounty:any[];
  countyname : string;
  schoolname : string;
  schoollist : any[];
  showDropDown : boolean;
  gCountyname : any;
  gSchoolname : any;

  constructor(
    private authService:AuthService,
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
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
    this.listCounty = _listCounty;
  }

  onCountySelect(countyname){
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
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
    this.schoollist = _schoolnames;
  }

  onInactivate(){
    const schoolDeatil = {
      countyname : this.countyname,
      schoolname : this.schoolname
    }

    this.gCountyname = schoolDeatil.countyname;
    this.gSchoolname = schoolDeatil.schoolname;

    if("undefined" !== typeof schoolDeatil.countyname &&
       "undefined" !== typeof schoolDeatil.schoolname){
      this.popup1.options = {
        header: "Inactivate School",
        color: "black", // red, blue....
        widthProsentage: 40, // The with of the popou measured by browser width
        animationDuration: 1, // in seconds, 0 = no animation
        showButtons: true, // You can hide this in case you want to use custom buttons
        confirmBtnContent: "Inactivate", // The text on your confirm button
        cancleBtnContent: "Cancel", // the text on your cancel button
        confirmBtnClass: "btn btn-danger", // your class for styling the confirm button
        cancleBtnClass: "btn btn-default", // you class for styling the cancel button
        animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
      };
      this.popup1.show(this.popup1.options);
    }else{
      this.flashMessage.show('Please enter/select values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
      this.router.navigate(['manageschools/activeateinactivateschool']);
    }

  }

  inActivateSchool(){
    const schoolDeatils = {
      countyname : this.gCountyname,
      schoolname : this.gSchoolname
    }

    if("undefined" !== typeof schoolDeatils.countyname){
      this.authService.inactivateSchool(schoolDeatils).subscribe(data => {
        if(data.success){
          this.flashMessage.show('School has been inactivated successfully.', {
           cssClass: 'alert-success',
           timeout: 5000
          });
          this.router.navigate(['dashboard/manageschools']);
        }else{
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['manageschools/activeateinactivateschool']);
        }
      });
    }else{
      this.flashMessage.show('Please enter/select values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
      this.router.navigate(['manageschools/activeateinactivateschool']);
    }
  }

  onActivate(){
    const schoolDeatil = {
      countyname : this.countyname,
      schoolname : this.schoolname
    }

    if("undefined" !== typeof schoolDeatil.countyname &&
       "undefined" !== typeof schoolDeatil.schoolname){
      this.authService.activateSchool(schoolDeatil).subscribe(data => {
        if(data.success){
          this.flashMessage.show('School has been activated successfully.', {
           cssClass: 'alert-success',
           timeout: 5000
          });
          this.router.navigate(['dashboard/manageschools']);
        }else{
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['manageschools/activeateinactivateschool']);
        }
      });
    }else{
      this.flashMessage.show('Please enter/select values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
      this.router.navigate(['manageschools/activeateinactivateschool']);
    }
  }

}
