import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-addnewschools',
  templateUrl: './addnewschools.component.html',
  styleUrls: ['./addnewschools.component.css']
})
export class AddnewschoolsComponent implements OnInit {
  independentschool : any;
  showTextBox: boolean;
  showDropDown: boolean;
  listCounty:any[];
  countyname : string;
  countyname1 : string;
  schoolname : string;
  isactive : string;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    this.independentschool = 'N';
    this.isDisable(false);
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

  isDisable(flag){
  // console.log('indeoendet: ' + this.independentschool);
    if(flag){
      this.showTextBox = false;
      this.showDropDown = true;
    }else{
      this.showTextBox = true;
      this.showDropDown = false;
    }

  }

  onSubmitNewSchool(){
    var tempcname;
    if(this.independentschool == 'N'){
      tempcname = this.countyname;
    }else{
      tempcname = this.countyname1;
    }
    const schoolDetails = {
      countyname : tempcname,
      schoolname : this.schoolname,
      isactive : 'Y'
    }

    const schoolDetailsforValidation = {
      countyname : tempcname,
      schoolname : this.schoolname,
      independent : this.independentschool
    }

    if(!this.validateService.validateCountyName(tempcname)){
      this.flashMessage.show('Please use valid county name.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validateSchoolName(schoolDetails.schoolname)){
      this.flashMessage.show('Please use valid school name.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(this.validateService.validateAddSchoolDetails(schoolDetailsforValidation) == true){
      this.authService.addNewSchool(schoolDetails).subscribe(data => {
        if(data.success){
          this.flashMessage.show('You have added school successfully.', {
           cssClass: 'alert-success',
           timeout: 5000
          });
          this.router.navigate(['dashboard/manageschools']);
        }else{
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['manageschools/addnewschool']);
        }
      });
    }else{
      this.flashMessage.show('Please enter/select values.', {
        cssClass: 'alert-danger',
        timeout: 5000});
      this.router.navigate(['manageschools/addnewschool']);
    }

  }

}
