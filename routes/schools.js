const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const School = require('../models/schools-model');


 // Get school data by schoolname and countyname.
router.post('/getschooldata', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let schoolname = req.body.schoolname;
  let countyname = req.body.countyname;

  School.getSchoolDataBySchoolnameAndCountyname(schoolname, countyname, (err, schoolData) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!schoolData) {
        return res.json({success: false, msg: 'School does not exist at the county.'});
      }
      else {
        return res.json({success: true, schoolData: schoolData});
      }
    }
  });
});


// Get all countynames which exist in the collection.
// Only admin can access this.
router.get('/getallcountynames', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    School.getAllCountynames((err, countynames) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!countynames) {
          return res.json({success: false, msg: 'Could not find countynames.'});
        }
        else {
          return res.json({success: true, countynames: countynames});
        }
      }
    });

  }
});


// Get all active schoolnames county wise.
// Only admin can access this.
router.get('/getallactiveschoolnamescountywise', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    School.getAllActiveSchoolnamesCountyWise((err, activeschoolnamescountywise) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!activeschoolnamescountywise) {
          return res.json({success: false, msg: 'Could not find active schoolnames.'});
        }
        else {
          return res.json({success: true, activeschoolnamescountywise: activeschoolnamescountywise});
        }
      }
    });

  }
});


// Get all (active and inactive) schoolnames at a county.
// Only admin can access this.
router.post('/getallschoolnamesatcounty', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let countyname = req.body.countyname;

    School.getAllSchoolnamesAtCounty(countyname, (err, schoolnames) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!schoolnames) {
          return res.json({success: false, msg: 'Could not find schoolnames at the county.'});
        }
        else {
          return res.json({success: true, schoolnames: schoolnames});
        }
      }
    });

  }
});


// Get all (active and inactive) schoolnames at a county of the logged-in user.
// Admin should not use this.
router.get('/getallschoolnamesatmycounty', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  School.getAllSchoolnamesAtCounty(req.user.countyname, (err, schoolnames) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!schoolnames) {
        return res.json({success: false, msg: 'Could not find schoolnames at the county.'});
      }
      else {
        return res.json({success: true, schoolnames: schoolnames});
      }
    }
  });
});


// Get all active schoolnames at a county of the logged-in user.
// Admin should not use this.
router.get('/getallactiveschoolnamesatmycounty', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  School.getAllActiveSchoolnamesAtCounty(req.user.countyname, (err, activeschoolnames) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!activeschoolnames) {
        return res.json({success: false, msg: 'Could not find active schoolnames at the county.'});
      }
      else {
        return res.json({success: true, activeschoolnames: activeschoolnames});
      }
    }
  });
});


// Get all inactive schoolnames at a county of the logged-in user.
// Admin should not use this.
router.get('/getallinactiveschoolnamesatmycounty', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  School.getAllInactiveSchoolnamesAtCounty(req.user.countyname, (err, inactiveschoolnames) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!inactiveschoolnames) {
        return res.json({success: false, msg: 'Could not find inactive schoolnames at the county.'});
      }
      else {
        return res.json({success: true, inactiveschoolnames: inactiveschoolnames});
      }
    }
  });
});


// Get all (active and inactive) schoolnames with their isactive status county wise.
// Only admin can access this.
router.get('/getallschoolnamesandisactivestatuscountywise', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    School.getAllSchoolnamesAndIsactiveStatusCountywise((err, schoolnamesandisactivestatuscountywise) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!schoolnamesandisactivestatuscountywise) {
          return res.json({success: false, msg: 'Could not find schoolnames and isactive status.'});
        }
        else {
          return res.json({success: true, schoolnamesandisactivestatuscountywise: schoolnamesandisactivestatuscountywise});
        }
      }
    });

  }
});


// Get all (active and inactive) schoolnames with their isactive status at a county of the logged-in user.
// Admin should not use this.
router.get('/getallschoolnamesandisactivestatusatmycounty', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  School.getAllSchoolnamesAndIsactiveStatusAtCounty(req.user.countyname, (err, schoolnamesandisactivestatus) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!schoolnamesandisactivestatus) {
        return res.json({success: false, msg: 'Could not find schoolnames and isactive status.'});
      }
      else {
        return res.json({success: true, schoolnamesandisactivestatus: schoolnamesandisactivestatus});
      }
    }
  });
});


// Get all academicyears which exist in the collection.
router.get('/getallacademicyearsexist', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  School.getAllAcademicyearsExist((err, academicyears) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!academicyears) {
        return res.json({success: false, msg: 'Could not find academicyears.'});
      }
      else {
        return res.json({success: true, academicyears: academicyears});
      }
    }
  });
});


// Add new school.
// Only admin can access this.
router.post('/addschool', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let newSchool = new School({
      countyname : req.body.countyname,
    	schoolname : req.body.schoolname,
    	isactive : req.body.isactive
    });

    // Convert first character of the countyname to capital letter.
    // First trim countyname value and then do the capitalization.
    newSchool.countyname = newSchool.countyname.trim();
    newSchool.countyname = newSchool.countyname.charAt(0).toUpperCase() + newSchool.countyname.slice(1);

    // First check if the given schoolname already exists at the given countyname.
    School.getSchoolDataBySchoolnameAndCountyname(newSchool.schoolname, newSchool.countyname, (err, schoolData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(schoolData) {
          return res.json({success: false, msg: 'School already exists at the county.'});
        }
        else {

          // Add school data.
          School.addSchool(newSchool, (err, schoolData) => {
            if(err) {
              res.json({success: false, msg: 'Something went wrong. Please try again.'});
            }
            else {
              res.json({success: true, msg: 'School data saved.'});
            }
          });

        }
      }
    });

  }
});


// Change schoolname of an existing school.
// Assumption: The school already exists.
// Only admin can access this.
router.post('/changeschoolname', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let oldSchoolname = req.body.oldschoolname;
    let countyname = req.body.countyname;
    let newSchoolname = req.body.newschoolname;

    School.changeSchoolname(oldSchoolname, countyname, newSchoolname, (err, oldSchoolData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'School name changed successfully.'});
      }
    });

  }
});


// Set a school inactive.
// Set isactive: "N" for a school.
// Assumption: The school already exists.
// Only admin can access this.
router.post('/setschoolinactive', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let schoolname = req.body.schoolname;
    let countyname = req.body.countyname;

    School.setSchoolInactive(schoolname, countyname, (err, oldSchoolData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'School is set inactive successfully.'});
      }
    });

  }
});


// Set a school active.
// Set isactive: "Y" for a school.
// Assumption: The school already exists.
// Only admin can access this.
router.post('/setschoolactive', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let schoolname = req.body.schoolname;
    let countyname = req.body.countyname;

    School.setSchoolActive(schoolname, countyname, (err, oldSchoolData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'School is set active successfully.'});
      }
    });

  }
});


// Change countyname of an existing county.
// Assumption: The county already exists.
// Only admin can access this.
router.post('/changecountyname', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let oldCountyname = req.body.oldcountyname;
    let newCountyname = req.body.newcountyname;

    School.changeCountyname(oldCountyname, newCountyname, (err, oldData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'County name changed successfully.'});
      }
    });

  }
});


// Add/change graduationinfo for an academic year for an existing school.
// Assumption: The school already exists.
router.post('/addorchangegraduationinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let schoolname = req.body.schoolname;
  let countyname = req.body.countyname;
  let academicyear = req.body.academicyear;
  let graduationdate = req.body.graduationdate;

  School.addOrChangeGraduationinfo(schoolname, countyname, academicyear, graduationdate, (err, oldSchoolData) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      res.json({success: true, msg: 'Graduation info saved/changed successfully.'});
    }
  });
});


// Remove graduationinfo for an academic year for an existing school.
// Assumption: The school already exists.
// Assumption: Graduationinfo for an academic year for the school already exist.
router.post('/removegraduationinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let schoolname = req.body.schoolname;
  let countyname = req.body.countyname;
  let academicyear = req.body.academicyear;

  School.removeGraduationinfo(schoolname, countyname, academicyear, (err, oldSchoolData) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      res.json({success: true, msg: 'Graduation info removed successfully.'});
    }
  });
});


// Get all (active and inactive) schoolnames with their graduation date for an academic year at a county of the logged-in user.
// Admin should not use this.
router.post('/getallschoolnamesandgraduationdateforacademicyearatmycounty', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let academicyear = req.body.academicyear;

  School.getAllSchoolnamesAndGraduationdateForAcademicyearAtCounty(req.user.countyname, academicyear, (err, schoolnamesandgraduationdate) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!schoolnamesandgraduationdate) {
        return res.json({success: false, msg: 'Could not find schoolnames and graduationdate.'});
      }
      else {
        return res.json({success: true, schoolnamesandgraduationdate: schoolnamesandgraduationdate});
      }
    }
  });
});


// Get all active schoolnames for which graduationinfo is not available for an academic year,
// sorted by countyname.
// Useful for Report-1.
// Only admin can access this.
router.post('/getallactiveschoolnameswithnograduationinfoforacademicyearsortedbycountyname', passport.authenticate('jwt', {session:false}),
  (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let academicyear = req.body.academicyear;

    School.getAllActiveSchoolnamesWithNoGraduationinfoForAcademicyearSortedByCountyname(academicyear, (err, schoolnamescountywise) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!schoolnamescountywise) {
          return res.json({success: false, msg: 'Could not find schoolnames.'});
        }
        else {
          return res.json({success: true, schoolnamescountywise: schoolnamescountywise});
        }
      }
    });

  }
});


// Get all (then-active) schoolnames, for which graduationinfo is available for an academic year, with their graduation date,
// sorted by countyname.
// Useful for Report-2.
// Only admin can access this.
router.post('/getallschoolnamesandgraduationdateforacademicyearsortedbycountyname', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let academicyear = req.body.academicyear;

    School.getAllSchoolnamesAndGraduationdateForAcademicyearSortedByCountyname(academicyear, (err, schoolnamesandgraduationdatecountywise) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!schoolnamesandgraduationdatecountywise) {
          return res.json({success: false, msg: 'Could not find schoolnames and graduationdate.'});
        }
        else {
          return res.json({success: true, schoolnamesandgraduationdatecountywise: schoolnamesandgraduationdatecountywise});
        }
      }
    });

  }
});


// Get all (then-active) schoolnames, for which graduationinfo is available for an academic year, with their graduation date,
// sorted by graduation date and then by countyname.
// Useful for Report-3.
// Only admin can access this.
router.post('/getallschoolnamesandgraduationdateforacademicyearsortedbygraduationdateandthenbycountyname', passport.authenticate('jwt', {session:false}),
  (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let academicyear = req.body.academicyear;

    School.getAllSchoolnamesAndGraduationdateForAcademicyearSortedByGraduationdateAndThenByCountyname(academicyear,
      (err, schoolnamesgraduationdatewiseandthencountywise) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!schoolnamesgraduationdatewiseandthencountywise) {
          return res.json({success: false, msg: 'Could not find schoolnames and graduationdate.'});
        }
        else {
          return res.json({success: true, schoolnamesgraduationdatewiseandthencountywise: schoolnamesgraduationdatewiseandthencountywise});
        }
      }
    });

  }
});


module.exports = router;
