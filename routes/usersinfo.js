const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Userinfo = require('../models/usersinfo-model');


/* // This function checks whether the userid is admin or not and sends appropriate message to the callback.
// For admin, it sends "You are admin." to the callback.
// For non-admin, it sends "You do not have access to this." to the callback.
// In case of any error, it sends "Something went wrong. Please try again." to the callback.
module.exports.isUseridAdmin = function(userid, callback) {
  Userinfo.getUserinfoByUserid(userid, (err, userinfo) => {
    if(err) {
      callback("Something went wrong. Please try again.");
    }
    else {
      if(!userinfo || "undefined" === typeof userinfo || userinfo.isadmin !== "Y") {
        callback("You do not have access to this.");
      }
      else {
        callback("You are admin.");
      }
    }
  });
} */


// Get userinfo of the logged-in user.
router.get('/getmyuserinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // console.log("--> " + require('util').inspect(req, { depth: null }));
  // console.log("--> My userinfo: " + req.user);
  res.json({success: true, userinfo: req.user});
});


// Get userinfo by userid.
// For an admin, county name will be given as "AllCounties".
// Only admin can access this.
router.post('/getuserinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let userid = req.body.userid;

    Userinfo.getUserinfoByUserid(userid, (err, userinfo) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!userinfo) {
          return res.json({success: false, msg: 'Userid does not exist.'});
        }
        else {
          return res.json({success: true, userinfo: userinfo});
        }
      }
    });

  }
});


// Add new userinfo.
// For an admin, pass county name as "AllCounties".
// Only admin can access this.
router.post('/adduserinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let newUserinfo = new Userinfo({
      userid : req.body.userid,
    	isadmin : req.body.isadmin,
    	countyname : req.body.countyname,
    	firstname : req.body.firstname,
    	lastname : req.body.lastname
    });

    // First check if the userid already exists.
    Userinfo.getUserinfoByUserid(newUserinfo.userid, (err, userinfo) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(userinfo) {
          return res.json({success: false, msg: 'Userid already exists.'});
        }
        else {

          // Add userinfo.
          Userinfo.addUserinfo(newUserinfo, (err, userinfo) => {
            if(err) {
              res.json({success: false, msg: 'Something went wrong. Please try again.'});
            }
            else {
              res.json({success: true, msg: 'Userinfo saved.'});
            }
          });

        }
      }
    });

  }
});


// Change firstname and lastname of the logged-in user.
// Assumption: The userid of the logged-in user already exist.
router.post('/changemyfirstnameandlastname', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let newFirstname = req.body.firstname;
  let newLastname = req.body.lastname;

  Userinfo.changeFirstnameAndLastname(req.user.userid, newFirstname, newLastname, (err, oldUserinfo) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      res.json({success: true, msg: 'Firstname and lastname changed successfully.'});
    }
  });
});


// Change userinfo.
// For an admin, pass county name as "AllCounties".
// Assumption: The userid already exist.
// Only admin can access this.
router.post('/changeuserinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let newUserinfo = new Userinfo({
      userid: req.body.userid,
    	isadmin : req.body.isadmin,
    	countyname : req.body.countyname,
    	firstname : req.body.firstname,
    	lastname : req.body.lastname
    });

    Userinfo.changeUserinfo(newUserinfo, (err, oldUserinfo) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'Userinfo changed successfully.'});
      }
    });

  }
});


// Delete userinfo.
// Assumption: The userid already exist.
// Only admin can access this.
router.post('/deleteuserinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let userid = req.body.userid;

    Userinfo.deleteUserinfo(userid, (err, userinfo) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'Userinfo deleted successfully.'});
      }
    });

  }
});


// Get list of all admins and users with their information county wise.
// For admins, county name will be given as "AllCounties".
// Only admin can access this.
router.get('/getallusersinfo', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    Userinfo.getAllUsersInfoCountyWise((err, data) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, data: data});
      }
    });

  }
});


module.exports = router;
