const mongoose = require('mongoose');


/* Sample document of the schools collection.
{
	countyname : "Barbour",
	schoolname : "Philip Barbour High School Complex",
	isactive : "Y",
	graduationinfo :
	[
		{
			academicyear : "2014-15",
			graduationdate : new Date("2015-05-01T00:00:00Z")
		},
		{
			academicyear : "2015-16",
			graduationdate : new Date("2016-05-01T00:00:00Z")
		},
		{
			academicyear : "2016-17",
			graduationdate : new Date("2017-05-01T00:00:00Z")
		},
    .
    .
    .

	]
}
*/


// Schema for the schools collection.
const SchoolsSchema = mongoose.Schema(
  {
    countyname: {
      type: String,
      required: true,
      trim: true
    },
    schoolname: {
      type: String,
      required: true,
      trim: true
    },
    isactive: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      enum: ["Y", "N"]
    },
    graduationinfo:
    [
      {
        academicyear: {
          type: String,
          required: true
        },
        graduationdate: {
          type: Date,
          required: true
        }
      }
    ]
  },
  {
    collection: 'schools'
  }
);


const School = module.exports = mongoose.model('School', SchoolsSchema);


// Get school data by the document id.
module.exports.getSchoolDataByDocId = function(docid, callback) {
  School.findById(docid, callback);
}


// Get school data by schoolname and countyname.
module.exports.getSchoolDataBySchoolnameAndCountyname = function(schoolname, countyname, callback) {
  // Trim schoolname and countyname values.
  schoolname = schoolname.trim();
  countyname = countyname.trim();

  School.findOne({schoolname: schoolname, countyname: countyname}, callback);
}


// Get all countynames which exist in the collection.
module.exports.getAllCountynames = function(callback) {
  School.distinct("countyname", callback);
}


// Get all active schoolnames county wise.
module.exports.getAllActiveSchoolnamesCountyWise = function(callback) {
  // Sorted by countyname and then by schoolname.
  School.aggregate([{$match: {"isactive": "Y"}},
    {$group: {_id: {county: "$countyname", school: "$schoolname"}}}, {$sort: {_id:1}},
    {$group: {_id: {countyname: "$_id.county"}, countschools: {$sum:1}, schoolnames: {$push: "$_id.school"}}}, {$sort: {_id:1}}],
    callback);
}


// Get all (active and inactive) schoolnames at a county.
module.exports.getAllSchoolnamesAtCounty = function(countyname, callback) {
  // Trim countyname value.
  countyname = countyname.trim();

  // School.find({countyname: countyname}, "schoolname -_id", callback);
  School.distinct("schoolname", {countyname: countyname}, callback);
}


// Get all active schoolnames at a county.
module.exports.getAllActiveSchoolnamesAtCounty = function(countyname, callback) {
  // Trim countyname value.
  countyname = countyname.trim();

  // School.find({countyname: countyname, isactive: "Y"}, "schoolname -_id", callback);
  School.distinct("schoolname", {countyname: countyname, isactive: "Y"}, callback);
}


// Get all inactive schoolnames at a county.
module.exports.getAllInactiveSchoolnamesAtCounty = function(countyname, callback) {
  // Trim countyname value.
  countyname = countyname.trim();

  // School.find({countyname: countyname, isactive: "N"}, "schoolname -_id", callback);
  School.distinct("schoolname", {countyname: countyname, isactive: "N"}, callback);
}


// Get all (active and inactive) schoolnames with their isactive status county wise.
module.exports.getAllSchoolnamesAndIsactiveStatusCountywise = function(callback) {
  // Sorted by countyname.
  School.aggregate([{$group:{_id:{countyname:"$countyname"}, countschools:{$sum:1},
    schoolsandisactivestatus:{$push:{$concat:["$schoolname", ": ", "$isactive"]}}}}, {$sort:{_id:1}}],
    callback);
}


// Get all (active and inactive) schoolnames with their isactive status at a county.
module.exports.getAllSchoolnamesAndIsactiveStatusAtCounty = function(countyname, callback) {
  // Trim countyname value.
  countyname = countyname.trim();

  // School.aggregate([{$match:{"countyname": countyname}}, {$group:{_id:{schoolname: "$schoolname", isactive: "$isactive"}}}], callback);
  // School.aggregate([{$match:{"countyname": countyname}}, {$project:{"schoolname":1, "isactive":1, _id:0}}], callback);
  School.find({countyname: countyname}, "schoolname isactive -_id", callback);
}


// Get all academicyears which exist in the collection.
module.exports.getAllAcademicyearsExist = function(callback) {
  School.distinct("graduationinfo.academicyear", callback);
}


// Add new school.
// Assumption: The school does not already exist.
module.exports.addSchool = function(newSchool, callback) {
  newSchool.save(callback);
}


// Change schoolname of an existing school.
// Assumption: The school already exists.
module.exports.changeSchoolname = function(oldSchoolname, countyname, newSchoolname, callback) {
  School.findOneAndUpdate({schoolname: oldSchoolname, countyname: countyname},
    {$set: {schoolname: newSchoolname}},
    {runValidators: true},
    callback);
}


// Set a school inactive.
// Set isactive: "N" for a school.
// Assumption: The school already exists.
module.exports.setSchoolInactive = function(schoolname, countyname, callback) {
  School.findOneAndUpdate({schoolname: schoolname, countyname: countyname},
    {$set: {isactive: "N"}},
    {runValidators: true},
    callback);
}


// Set a school active.
// Set isactive: "Y" for a school.
// Assumption: The school already exists.
module.exports.setSchoolActive = function(schoolname, countyname, callback) {
  School.findOneAndUpdate({schoolname: schoolname, countyname: countyname},
    {$set: {isactive: "Y"}},
    {runValidators: true},
    callback);
}


// Change countyname of an existing county.
// Assumption: The county already exists.
module.exports.changeCountyname = function(oldCountyname, newCountyname, callback) {
  School.updateMany({countyname: oldCountyname},
    {$set: {countyname: newCountyname}},
    {runValidators: true},
    callback);
}


// Add/change graduationinfo for an academic year for an existing school.
// Assumption: The school already exists.
module.exports.addOrChangeGraduationinfo = function(schoolname, countyname, academicyear, graduationdate, callback) {
  // Trim schoolname and countyname values.
  schoolname = schoolname.trim();
  countyname = countyname.trim();

  // First remove the graduationinfo related to given academic year for given school if exists.
  School.findOneAndUpdate({schoolname: schoolname, countyname: countyname},
    {$pull: {graduationinfo: {academicyear: academicyear}}},

    (err, oldSchoolData) => {
      if(err) {
        callback(err, null);
      }
      else {

        // Add the new graduationinfo related to given academic year for given school.
        School.findOneAndUpdate({schoolname: schoolname, countyname: countyname},
          {$addToSet: {graduationinfo: {academicyear: academicyear, graduationdate: graduationdate}}},
          {runValidators: true},
          callback);
      }
    }
  );
}


// Remove graduationinfo for an academic year for an existing school.
// Assumption: The school already exists.
// Assumption: Graduationinfo for an academic year for an existing school already exist.
module.exports.removeGraduationinfo = function(schoolname, countyname, academicyear, callback) {
  // Trim schoolname and countyname values.
  schoolname = schoolname.trim();
  countyname = countyname.trim();

  School.findOneAndUpdate({schoolname: schoolname, countyname: countyname},
    {$pull: {graduationinfo: {academicyear: academicyear}}},
    callback);
}


// Get all (active and inactive) schoolnames with their graduation date for an academic year at a county.
module.exports.getAllSchoolnamesAndGraduationdateForAcademicyearAtCounty = function(countyname, academicyear, callback) {
  // Trim countyname value.
  countyname = countyname.trim();

  // School.find({countyname: countyname, "graduationinfo.academicyear": academicyear}, "schoolname graduationinfo.graduationdate.$ -_id", callback);
  /* School.aggregate([{$unwind:"$graduationinfo"}, {$match:{"countyname": countyname, "graduationinfo.academicyear":academicyear}},
    {$group:{_id:{schoolname: "$schoolname", graduationdate: "$graduationinfo.graduationdate"}}}], callback); */
  School.aggregate([{$unwind: "$graduationinfo"}, {$match: {"countyname": countyname, "graduationinfo.academicyear": academicyear}},
    {$project: {"schoolname":1, "graduationinfo.graduationdate":1, _id:0}}],
    callback);
}

// Get all active schoolnames for which graduationinfo is not available for an academic year,
// sorted by countyname.
module.exports.getAllActiveSchoolnamesWithNoGraduationinfoForAcademicyearSortedByCountyname = function(academicyear, callback) {
  School.aggregate([{$match: {"graduationinfo.academicyear": {$ne: academicyear}, "isactive": "Y"}},
    {$group: {_id: {countyname: "$countyname"}, countschools: {$sum:1}, schools: {$push: "$schoolname"}}},
    {$sort: {_id:1}}],
    callback);
}

// Get all (then-active) schoolnames, for which graduationinfo is available for an academic year, with their graduation date,
// sorted by countyname.
module.exports.getAllSchoolnamesAndGraduationdateForAcademicyearSortedByCountyname = function(academicyear, callback) {
  School.aggregate([{$unwind: "$graduationinfo"}, {$match: {"graduationinfo.academicyear": academicyear}},
    {$group: {_id: {countyname: "$countyname"}, countschools: {$sum:1},
      schoolwisegraduationdate: {$push: {$concat: ["$schoolname", ": ", {$dateToString: {format: "%m/%d/%Y", date: "$graduationinfo.graduationdate"}}]}}}},
    {$sort: {_id:1}}],
    callback);
}

// Get all (then-active) schoolnames, for which graduationinfo is available for an academic year, with their graduation date,
// sorted by graduation date and then by countyname.
module.exports.getAllSchoolnamesAndGraduationdateForAcademicyearSortedByGraduationdateAndThenByCountyname = function(academicyear, callback) {
  School.aggregate([{$unwind: "$graduationinfo"}, {$match: {"graduationinfo.academicyear": academicyear}},
    {$group: {_id: {graduationdate: "$graduationinfo.graduationdate", county: "$countyname"}, countschools: {$sum:1}, schools: {$push: "$schoolname"}}},
    {$sort: {_id:1}},
    {$group: {_id: {graduationdate: {$dateToString: {format: "%m/%d/%Y", date: "$_id.graduationdate"}}}, countcounties: {$sum:1},
      countywiseschools: {$push: {countyname: "$_id.county", countschools: "$countschools", schools: "$schools"}}}},
    {$sort: {_id:1}}],
    callback);
}
