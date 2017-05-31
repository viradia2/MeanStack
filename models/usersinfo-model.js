const mongoose = require('mongoose');


/* Sample document of the usersinfo collection.
{
	userid : "abc.xyz",
	isadmin : "N",
	countyname : "Cabell",
	firstname : "Abc",
	lastname : "Xyz"
}
*/


// Schema for the usersinfo collection.
const UsersinfoSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    isadmin: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      enum: ["Y", "N"]
    },
    countyname: {
      type: String,
      required: true,
      trim: true
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    collection: 'usersinfo'
  }
);


const Userinfo = module.exports = mongoose.model('Userinfo', UsersinfoSchema);


// Get user info by the document id.
module.exports.getUserinfoByDocId = function(docid, callback) {
  Userinfo.findById(docid, callback);
}


// Get user info by userid.
module.exports.getUserinfoByUserid = function(userid, callback) {
  // Trim userid value.
  userid = userid.trim();
  // Convert letters in userid value to lower case.
  // Userinfo.count({userid: new RegExp("^"+userid+"$", "i")}, callback);
  // Userinfo.findOne({userid: new RegExp("^"+userid+"$", "i")}, callback);
  userid = userid.toLowerCase();

  Userinfo.findOne({userid: userid}, callback);
}


// Add new userinfo.
// Assumption: The userid does not already exist.
module.exports.addUserinfo = function(newUserinfo, callback) {
  newUserinfo.save(callback);
}


// Change firstname and lastname.
// Assumption: The userid already exist.
module.exports.changeFirstnameAndLastname = function(userid, newFirstname, newLastname, callback) {
  Userinfo.findOneAndUpdate({userid: userid},
    {$set: {firstname: newFirstname, lastname: newLastname}},
    {runValidators: true},
    callback);
}


// Change userinfo.
// Assumption: The userid already exist.
module.exports.changeUserinfo = function(newUserinfo, callback) {
  Userinfo.findOneAndUpdate({userid: newUserinfo.userid},
    {$set: {userid: newUserinfo.userid, isadmin: newUserinfo.isadmin, countyname: newUserinfo.countyname,
      firstname: newUserinfo.firstname, lastname: newUserinfo.lastname}},
    {runValidators: true},
    callback);
}


// Delete userinfo.
// Assumption: The userid already exist.
module.exports.deleteUserinfo = function(userid, callback) {
  // Trim userid value.
  userid = userid.trim();
  // Convert letters in userid value to lower case.
  userid = userid.toLowerCase();

  Userinfo.findOneAndRemove({userid: userid}, callback);
}


// Get list of all admins and users with their information county wise.
// For admins, county name will be given as "AllCounties".
module.exports.getAllUsersInfoCountyWise = function(callback) {
  Userinfo.aggregate({$group: {_id: {countyname:"$countyname"}, userscount: {$sum:1},
    usersinfo: {$push: {userid:"$userid", firstname:"$firstname", lastname:"$lastname", isadmin:"$isadmin"}}}},
    {$sort: {_id:1}},
    callback);
}
