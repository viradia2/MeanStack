const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Login = require('../models/login-model');
const Userinfo = require('../models/usersinfo-model');
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;

  /* passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("--> jwt_payload:");
    // console.log(jwt_payload);

    // Get login data from the login collection by the document id present in the JWT token.
    Login.getLoginDataByDocId(jwt_payload._doc._id, (err, loginData) => {
      if(err) {
        return done(err, false);
      }
      else {
        if(!loginData || "undefined" === typeof loginData) {
          return done(null, false);
        }
        else {
          // console.log("--> loginData:" + loginData)
          return done(null, loginData);
        }
      }
    });
  })); */

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("--> jwt_payload:");
    // console.log(jwt_payload);

    // First identify the userid and password from the JWT token and verify it.
    // If it is an authenticated user, then get userinfo from the usersinfo collection by the userid.

    // Get login data from the login collection by the userid present in the JWT token.
    Login.getLoginDataByUserid(jwt_payload.userid, (err, loginData) => {
      if(err) {
        return done(err, false);
      }
      else {
        if(!loginData || "undefined" === typeof loginData) {
          return done(null, false);
        }
        else {

          // Compare the password present in the JWT token with the password present in the database for that userid.
          // Both the passwords are in their hash format here. So compare them directly.
          if(jwt_payload.password !== loginData.password) {
            return done(null, false);
          }
          else {

            // User has been authenticated successfully.
            // Get userinfo from the usersinfo collection by the userid present in the JWT token.
            Userinfo.getUserinfoByUserid(jwt_payload.userid, (err, userinfo) => {
              if(err) {
                return done(err, false);
              }
              else {
                if(!userinfo || "undefined" === typeof userinfo) {
                  return done(null, false);
                }
                else {

                  // console.log("--> userinfo:" + userinfo)
                  return done(null, userinfo);

                }
              }
            });

          }

        }
      }
    });

  }));

}
