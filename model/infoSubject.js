const mongoose = require("mongoose");
const infoSubjectRouter = require("../controllers/infoSubjects.js");

const infoSubjectSchema = new mongoose.Schema({
  name: String,
  price: String,
  CODSubject: String,
  CODCareer: String,
  CODFaculty: String,
  cupos: Number,
  time: Number,
  requirements: String,
});

const infoSubject = mongoose.model("infoSubjects", infoSubjectSchema);

module.exports = infoSubject;
