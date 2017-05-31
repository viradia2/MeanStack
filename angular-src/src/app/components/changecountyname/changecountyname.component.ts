import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-changecountyname',
  templateUrl: './changecountyname.component.html',
  styleUrls: ['./changecountyname.component.css']
})
export class ChangecountynameComponent implements OnInit {

  listCounty:any[];
  oldcountyname : any;
  newcountyname : any;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
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

  onUpdateCounty(){
    const countyChangeDetail = {
      oldcountyname : this.oldcountyname,
      newcountyname : this.newcountyname
    }


    if(!this.validateService.validateCountyName(countyChangeDetail.newcountyname)){
      this.flashMessage.show('Use valid county name', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.changeCountyName(countyChangeDetail).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You have changed county name successfully.', {
         cssClass: 'alert-success',
         timeout: 5000
        });
        this.router.navigate(['dashboard/manageschools']);
      }else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });
  }

}
