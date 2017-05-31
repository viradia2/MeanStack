import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class ValidateService {
  userinfo: any;
  userid : string;
  firstname : string;
  lastname : string;
  countyname : string;
  password : string;
  isadmin : string;
  constructor(
    private authService:AuthService
  ) { }

  validateRegister(user){
    if("undefined" === typeof user.name || user.name === "" || user.name.trim().length == 0 ||
      "undefined" === typeof user.email || user.email === "" || user.email.trim().length == 0 ||
      "undefined" === typeof user.password || user.password === "" || user.password.trim().length == 0 ||
      "undefined" === typeof user.username || user.username === "" || user.username.trim().length == 0){
      return false;
    } else{
      return true;
    }
  }

  validateAddUser(user){
    if("undefined" === typeof user.userid || user.userid === "" || user.userid.trim().length == 0 ||
      "undefined" === typeof user.password || user.password === "" || user.password.trim().length == 0 ||
      "undefined" === typeof user.firstname || user.firstname === "" || user.firstname.trim().length == 0 ||
      "undefined" === typeof user.lastname || user.lastname === "" || user.lastname.trim().length == 0){
      return false;
    } else{
      return true;
    }
  }

  validateUpdateSchoolName(schoolChangeDetail){
    if("undefined" === typeof schoolChangeDetail.newschoolname || schoolChangeDetail.newschoolname === "" ||
      schoolChangeDetail.newschoolname.trim().length == 0) {
      return false;
    } else{
      return true;
    }
  }


  validateAddSchoolDetails(schoolDetailsforValidation){
    if("undefined" === typeof schoolDetailsforValidation.schoolname || schoolDetailsforValidation.schoolname === "" ||
      schoolDetailsforValidation.schoolname.trim().length == 0){
      return false;
    } else if(schoolDetailsforValidation.independent == "Y"){
      if("undefined" === typeof schoolDetailsforValidation.countyname || schoolDetailsforValidation.countyname === "" ||
        schoolDetailsforValidation.countyname.trim().length == 0 ){
        return false;
      } else{
          return true;
        }
    } else{
      return true;
    }

  }

  validatePassword(user2){
    if(user2.newpassword != user2.confirmpassword)
      return false;
    else
      return true;
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateSchoolName(schoolname){
    const re = /^[A-Za-z]+[A-Za-z0-9 .,'-]*$/;
    return re.test(schoolname);
  }

  validateCountyName(countyname){
    const re = /^[A-Za-z]+[A-Za-z .,'-]*$/;
    return re.test(countyname);
  }

  validateFName(firstname){
    const re = /^[A-Za-z]+[A-Za-z .,'-]*$/;
    return re.test(firstname);
  }

  validateLName(lastname){
    const re = /^[A-Za-z]+[A-Za-z .,'-]*$/;
    return re.test(lastname);
  }

  canAccess(isadmin){
      if(isadmin == 'Y'){
        // console.log('userinfo---->' + isadmin);
        return true;
      }else{
        return false;
      }
  }

}
