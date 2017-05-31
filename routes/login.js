const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Login = require('../models/login-model');


// Check if userid exists.
// Only admin can access this.
router.post('/doesuseridexist', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let userid = req.body.userid;

    Login.getLoginDataByUserid(userid, (err, loginData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(!loginData) {
          return res.json({success: false, msg: 'Userid does not exist.'});
        }
        else {
          return res.json({success: true, msg: 'Userid exists.'});
        }
      }
    });

  }
});


/* // Get password by userid.
router.post('/getpasswordbyuserid', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let userid = req.body.userid;

  Login.getPasswordByUserid(userid, (err, password) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!password) {
        return res.json({success: false, msg: 'Userid not found.'});
      }
      else {
        return res.json({success: true, password: password});
      }
    }
  });
}); */


// Authenticate.
router.post('/authenticate', (req, res, next) => {
  // Take data from the request body.
  let userid = req.body.userid;
  let password = req.body.password;

  // Get login data by the user inputted userid from the login collection.
  Login.getLoginDataByUserid(userid, (err, loginData) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(!loginData || "undefined" === typeof loginData) {
        return res.json({success: false, msg: 'User not found.'});
      }
      else {

        // Compare the user inputted password with the password present in the database for that userid.
        Login.comparePassword(password, loginData.password, (err, isMatch) => {
          if(err) {
            res.json({success: false, msg: 'Something went wrong. Please try again.'});
          }
          else {
            if(!isMatch) {
              return res.json({success: false, msg: 'Incorrect password.'});
            }
            else {

              // User has inputted correct userid and password. Allow the user to login.
              // Send the user a new JWT token.
              // let token = jwt.sign(loginData, config.secret, {
              let user = {userid: loginData.userid, password: loginData.password};
              let token = jwt.sign(user, config.secret, {
                expiresIn: '1h' // Will expire in 1 hour
              });
              res.json({
                success: true,
                token: 'JWT ' + token
              });

            }
          }
        });

      };
    }
  });
});


// Add new login detail.
// Only admin can access this.
router.post('/addlogin', (req, res, next) => {
  // Take data from the request body.
  let newLogin = new Login({
    userid: req.body.userid,
    password: req.body.password
  });

  // First check if the userid already exists.
  Login.getLoginDataByUserid(newLogin.userid, (err, loginData) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      if(loginData) {
        return res.json({success: false, msg: 'Userid already exists.'});
      }
      else {

        // Add login detail.
        Login.addLogin(newLogin, (err, loginData) => {
          if(err) {
            res.json({success: false, msg: 'Something went wrong. Please try again.'});
          }
          else {
            res.json({success: true, msg: 'Login detail saved.'});
          }
        });

      }
    }
  });
});


// Add new login detail.
// Only admin can access this.
/* router.post('/addlogin', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let newLogin = new Login({
      userid: req.body.userid,
      password: req.body.password
    });

    // First check if the userid already exists.
    Login.getLoginDataByUserid(newLogin.userid, (err, loginData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        if(loginData) {
          return res.json({success: false, msg: 'Userid already exists.'});
        }
        else {

          // Add login detail.
          Login.addLogin(newLogin, (err, loginData) => {
            if(err) {
              res.json({success: false, msg: 'Something went wrong. Please try again.'});
            }
            else {
              res.json({success: true, msg: 'Login detail saved.'});
            }
          });

        }
      }
    });

  }
}); */


// Change password of the logged-in user.
// Assumption: The userid of the logged-in user already exist.
router.post('/changemypassword', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // Take data from the request body.
  let newPassword = req.body.password;

  Login.changePassword(req.user.userid, newPassword, (err, oldLoginData) => {
    if(err) {
      res.json({success: false, msg: 'Something went wrong. Please try again.'});
    }
    else {
      res.json({success: true, msg: 'Password changed successfully.'});
    }
  });
});


// Change password of other user.
// Assumption: The userid of the other user already exist.
// Only admin can access this.
router.post('/changepasswordofotheruser', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let userid = req.body.userid; // userid of the other person.
    let newPassword = req.body.password;

    Login.changePassword(userid, newPassword, (err, oldLoginData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'Password of the user changed successfully.'});
      }
    });

  }
});


// Delete login detail.
// Assumption: The userid already exist.
// Only admin can access this.
router.post('/deletelogin', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // First check if the caller is admin. If they are admin, then only continue with the requested functionality.
  if("undefined" === typeof req.user.isadmin || req.user.isadmin !== "Y") {
    return res.json({success: false, msg: 'You do not have access to this.'});
  }
  else {
    // The caller is admin. Continue with the requested functionality.

    // Take data from the request body.
    let userid = req.body.userid;

    Login.deleteLogin(userid, (err, loginData) => {
      if(err) {
        res.json({success: false, msg: 'Something went wrong. Please try again.'});
      }
      else {
        res.json({success: true, msg: 'Login detail deleted successfully.'});
      }
    });

  }
});

/* // getrequser.
router.get('/getrequser', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // console.log("--> " + require('util').inspect(req, { depth: null }));
  res.json({success: true, data: req.user});
}); */


module.exports = router;
