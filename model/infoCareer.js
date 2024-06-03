const mongoose = require("mongoose");
const infoCareerRouter = require("../controllers/infoCareers");

const infoCareerSchema = new mongoose.Schema({
  name: String,
  CODCareer: String,
  CODFaculty: String,
});

const infoCareer = mongoose.model("infoCareers", infoCareerSchema);

module.exports = infoCareer;
