const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


/* Sample document of the login collection.
{
	userid : "abc.xyz",
	password : "Password#1"
}
*/


// Schema for the login collection.
const LoginSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    collection: 'login'
  }
);


const Login = module.exports = mongoose.model('Login', LoginSchema);


// Get login data by the document id.
module.exports.getLoginDataByDocId = function(docid, callback) {
  Login.findById(docid, callback);
}


// Get login data by userid.
module.exports.getLoginDataByUserid = function(userid, callback) {
  // Trim userid value.
  userid = userid.trim();
  // Convert letters in userid value to lower case.
  // Login.count({userid: new RegExp("^"+userid+"$", "i")}, callback);
  // Login.findOne({userid: new RegExp("^"+userid+"$", "i")}, callback);
  userid = userid.toLowerCase();

  Login.findOne({userid: userid}, callback);
}


// Get password by userid.
/* module.exports.getPasswordByUserid = function(userid, callback) {
  // Trim userid value.
  userid = userid.trim();
  // Convert letters in userid value to lower case.
  userid = userid.toLowerCase();

  Login.findOne({userid: userid}, {'password':1, '_id':0}, callback);
} */


// Add new login detail.
// Assumption: The userid does not already exist.
module.exports.addLogin = function(newLogin, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newLogin.password, salt, (err, hash) => {
      if(err) {
        console.log("Error occured in bcrypt.hash().");
        callback(true, null);
      }
      else {
        newLogin.password = hash;
        newLogin.save(callback);
      }
    });
  });
}


// Change password.
// Assumption: The userid already exist.
module.exports.changePassword = function(userid, newPassword, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPassword, salt, (err, hash) => {
      if(err) {
        console.log("Error occured in bcrypt.hash().");
        callback(true, null);
      }
      else {
        newPassword = hash;
        // Update the password in the database.
        Login.findOneAndUpdate({userid: userid},
          {$set: {password: newPassword}},
          {runValidators: true},
          callback);
      }
    });
  });
}


// Delete login detail.
// Assumption: The userid already exist.
module.exports.deleteLogin = function(userid, callback) {
  // Trim userid value.
  userid = userid.trim();
  // Convert letters in userid value to lower case.
  userid = userid.toLowerCase();

  Login.findOneAndRemove({userid: userid}, callback);
}


// Compare simple text password with a password hash and check if both are same.
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) {
      callback(err, isMatch);
    }
    else {
      callback(null, isMatch);
    }
  });
}
