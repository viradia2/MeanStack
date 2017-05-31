import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  userid : any;

  constructor(private http:Http) { }

  doesUserIdExists(userid){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/login/doesuseridexist',userid,{headers: headers})
    return this.http.post('login/doesuseridexist',userid,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/login/authenticate', user,{headers: headers})
    return this.http.post('login/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  generateReportfornotSubmittedGradDates(aYear){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/getallactiveschoolnameswithnograduationinfoforacademicyearsortedbycountyname',aYear,{headers: headers})
    return this.http.post('schools/getallactiveschoolnameswithnograduationinfoforacademicyearsortedbycountyname',aYear,{headers: headers})
      .map(res => res.json());
  }

  generateReportforSubmittedGradDates(aYear){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/getallschoolnamesandgraduationdateforacademicyearsortedbycountyname',aYear,{headers: headers})
    return this.http.post('schools/getallschoolnamesandgraduationdateforacademicyearsortedbycountyname',aYear,{headers: headers})
      .map(res => res.json());
  }

  generateReportforSubmittedGradDatesOrderedbyDates(aYear){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/getallschoolnamesandgraduationdateforacademicyearsortedbygraduationdateandthenbycountyname',aYear,{headers: headers})
    return this.http.post('schools/getallschoolnamesandgraduationdateforacademicyearsortedbygraduationdateandthenbycountyname',aYear,{headers: headers})
      .map(res => res.json());
  }

  getAllAcademicYearsExists(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/schools/getallacademicyearsexist',{headers: headers})
    return this.http.get('schools/getallacademicyearsexist',{headers: headers})
      .map(res => res.json());
  }

  getAllActiveSchoolAtCounty(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/schools/getallactiveschoolnamesatmycounty',{headers: headers})
    return this.http.get('schools/getallactiveschoolnamesatmycounty',{headers: headers})
      .map(res => res.json());
  }

  getallschoolnamesatcounty(schoolDetail){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/getallschoolnamesatcounty',schoolDetail,{headers: headers})
    return this.http.post('schools/getallschoolnamesatcounty',schoolDetail,{headers: headers})
      .map(res => res.json());
  }

  changeSchoolName(schoolChangeDetail){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/changeschoolname',schoolChangeDetail,{headers: headers})
    return this.http.post('schools/changeschoolname',schoolChangeDetail,{headers: headers})
      .map(res => res.json());
  }

  changeCountyName(countyChangeDetail){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/changecountyname',countyChangeDetail,{headers: headers})
    return this.http.post('schools/changecountyname',countyChangeDetail,{headers: headers})
      .map(res => res.json());
  }

  changeGraduationDate(graduationinfo){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/addorchangegraduationinfo',graduationinfo,{headers: headers})
    return this.http.post('schools/addorchangegraduationinfo',graduationinfo,{headers: headers})
      .map(res => res.json());
  }

  deleteGraduationDate(graduationinfo){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/removegraduationinfo',graduationinfo,{headers: headers})
    return this.http.post('schools/removegraduationinfo',graduationinfo,{headers: headers})
      .map(res => res.json());
  }

  inactivateSchool(schoolDeatils){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/setschoolinactive',schoolDeatils,{headers: headers})
    return this.http.post('schools/setschoolinactive',schoolDeatils,{headers: headers})
      .map(res => res.json());
  }

  activateSchool(schoolDeatil){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/setschoolactive',schoolDeatil,{headers: headers})
    return this.http.post('schools/setschoolactive',schoolDeatil,{headers: headers})
      .map(res => res.json());
  }


  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // console.log('here after routing to profile');
    // return this.http.get('http://localhost:3000/usersinfo/getmyuserinfo',{headers: headers})
    return this.http.get('usersinfo/getmyuserinfo',{headers: headers})
      .map(res => res.json());
  }

  addUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/login/addlogin', user,{headers: headers})
    return this.http.post('login/addlogin', user,{headers: headers})
      .map(res => res.json());
  }

  addUserinfo(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/usersinfo/adduserinfo', user,{headers: headers})
    return this.http.post('usersinfo/adduserinfo', user,{headers: headers})
      .map(res => res.json());
  }

  addNewSchool(schoolDetails){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/addschool',schoolDetails,{headers: headers})
    return this.http.post('schools/addschool',schoolDetails,{headers: headers})
      .map(res => res.json());
  }

  deleteUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/usersinfo/deleteuserinfo',user,{headers: headers})
    return this.http.post('usersinfo/deleteuserinfo',user,{headers: headers})
        .map(res => res.json());
  }
  deleteLoginUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/login/deletelogin',user,{headers: headers})
    return this.http.post('login/deletelogin',user,{headers: headers})
      .map(res => res.json());
  }

  updateUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/usersinfo/changeuserinfo',user,{headers: headers})
    return this.http.post('usersinfo/changeuserinfo',user,{headers: headers})
        .map(res => res.json());
  }

  updatemyProfile(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/usersinfo/changemyfirstnameandlastname',user,{headers: headers})
    return this.http.post('usersinfo/changemyfirstnameandlastname',user,{headers: headers})
        .map(res => res.json());
  }

  getsubmittedgradDates(aYear){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/schools/getallschoolnamesandgraduationdateforacademicyearatmycounty',aYear,{headers: headers})
    return this.http.post('schools/getallschoolnamesandgraduationdateforacademicyearatmycounty',aYear,{headers: headers})
        .map(res => res.json());
  }

  changePassword(password){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/login/changemypassword',password,{headers: headers})
    return this.http.post('login/changemypassword',password,{headers: headers})
      .map(res => res.json());
  }

  changePasswordforOtherUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.post('http://localhost:3000/login/changepasswordofotheruser',user,{headers: headers})
    return this.http.post('login/changepasswordofotheruser',user,{headers: headers})
      .map(res => res.json());
  }

  getAllUserInfo(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // console.log('userid : ' + user.userid);
    // return this.http.get('http://localhost:3000/usersinfo/getallusersinfo', {headers: headers})
    return this.http.get('usersinfo/getallusersinfo', {headers: headers})
        .map(res => res.json());
  }

  getAllCountyName(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/schools/getallcountynames', {headers: headers})
    return this.http.get('schools/getallcountynames', {headers: headers})
        .map(res => res.json());
  }

  viewAllSchoolAtCounty(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/schools/getallschoolnamesandisactivestatusatmycounty', {headers: headers})
    return this.http.get('schools/getallschoolnamesandisactivestatusatmycounty', {headers: headers})
        .map(res => res.json());
  }

  getAllSchool(){
    let headers = new Headers();
    // console.log('inallschool');
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    // return this.http.get('http://localhost:3000/schools/getallschoolnamesandisactivestatuscountywise', {headers: headers})
    return this.http.get('schools/getallschoolnamesandisactivestatuscountywise', {headers: headers})
        .map(res => res.json());
  }


  loadUser(){
  const user = localStorage.getItem('user');
  // console.log('Stroed user id : ' + user);
  this.userid = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    // console.log('token.load: ' + token);
    this.authToken = token;
  }

  storeUserData(token, user){
    //(Key , Value)
    localStorage.setItem('id_token', token);
    //local storage can only store string so we are using stringify
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }
  storeUserToken(token){
    //(Key , Value)
    localStorage.setItem('id_token', token);
    //local storage can only store string so we are using stringify
  //  localStorage.setItem('user', user);
    this.authToken = token;
  //  this.user = user;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
