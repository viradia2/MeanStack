import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {PopupModule} from 'ng2-opd-popup'; //For Pop-Up Box
// import { SweetAlertService } from 'ng2-sweetalert2';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { Globals } from './services/globals';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guard/auth.guard';
import { ManageuserComponent } from './components/manageuser/manageuser.component';
import { GetalluserinfoComponent } from './components/getalluserinfo/getalluserinfo.component';
import { AdduserinfoComponent } from './components/adduserinfo/adduserinfo.component';
import { AddgraduationdatesComponent } from './components/addgraduationdates/addgraduationdates.component';
import { UpdatedeleteuserComponent } from './components/updatedeleteuser/updatedeleteuser.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { ChangeotheruserpasswordComponent } from './components/changeotheruserpassword/changeotheruserpassword.component';
import { ManageschoolsComponent } from './components/manageschools/manageschools.component';
import { ViewallschoolsComponent } from './components/viewallschools/viewallschools.component';
import { AddnewschoolsComponent } from './components/addnewschools/addnewschools.component';
import { UpdateschoolnameComponent } from './components/updateschoolname/updateschoolname.component';
import { ActivateinactivateschoolComponent } from './components/activateinactivateschool/activateinactivateschool.component';
import { ViewallschoolatcountyComponent } from './components/viewallschoolatcounty/viewallschoolatcounty.component';
import { ViewsubmittedgraddatesComponent } from './components/viewsubmittedgraddates/viewsubmittedgraddates.component';
import { SubmitchangegraddateComponent } from './components/submitchangegraddate/submitchangegraddate.component';
import { RemovegraddatesComponent } from './components/removegraddates/removegraddates.component';
import { ReportComponent } from './components/report/report.component';
import { Report1Component } from './components/report1/report1.component';
import { Report2Component } from './components/report2/report2.component';
import { Report3Component } from './components/report3/report3.component';
import { ChangecountynameComponent } from './components/changecountyname/changecountyname.component';


const appRoutes: Routes = [
  {
    path : 'addgraduationinfo',
    component : AddgraduationdatesComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'addgraduationinfo/viewallschoolatcounty',
    component : ViewallschoolatcountyComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'addgraduationinfo/viewsubmittedgraddates',
    component : ViewsubmittedgraddatesComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'addgraduationinfo/submitchangegraddate',
    component : SubmitchangegraddateComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'addgraduationinfo/removegraddates',
    component : RemovegraddatesComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'profile/changepassword',
    component : ChangepasswordComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'profile/updateprofile',
    component : UpdateprofileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard/manageuser',
    component : ManageuserComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard/manageschools',
    component : ManageschoolsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'manageschools/viewallschools',
    component : ViewallschoolsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'manageschools/addnewschool',
    component : AddnewschoolsComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'manageschools/updatecountyname',
    component : ChangecountynameComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'manageschools/updateschoolname',
    component : UpdateschoolnameComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'manageschools/activeateinactivateschool',
    component : ActivateinactivateschoolComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard/report',
    component : ReportComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard/report/report1',
    component : Report1Component,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard/report/report2',
    component : Report2Component,
    canActivate : [AuthGuard]
  },
  {
    path : 'dashboard/report/report3',
    component : Report3Component,
    canActivate : [AuthGuard]
  },
  {
    path: 'manageuser/getalluserinfo',
    component : GetalluserinfoComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'manageuser/changeotheruserpassword',
    component : ChangeotheruserpasswordComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'manageuser/adduserinfo',
    component : AdduserinfoComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'manageuser/updatedeleteuser',
    component : UpdatedeleteuserComponent,
    canActivate : [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    ManageuserComponent,
    GetalluserinfoComponent,
    AdduserinfoComponent,
    AddgraduationdatesComponent,
    ManageschoolsComponent,
    UpdatedeleteuserComponent,
    ChangepasswordComponent,
    UpdateprofileComponent,
    ChangeotheruserpasswordComponent,
    ManageschoolsComponent,
    ViewallschoolsComponent,
    AddnewschoolsComponent,
    UpdateschoolnameComponent,
    ActivateinactivateschoolComponent,
    NavbarComponent,
    ViewallschoolatcountyComponent,
    ViewsubmittedgraddatesComponent,
    SubmitchangegraddateComponent,
    RemovegraddatesComponent,
    ReportComponent,
    Report1Component,
    Report2Component,
    Report3Component,
    ChangecountynameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,

    ModalModule.forRoot(),
    BootstrapModalModule,

    PopupModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
