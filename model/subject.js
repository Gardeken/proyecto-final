const mongoose = require("mongoose");
const subjectRouter = require("../controllers/subjects.js");

const subjectSchema = new mongoose.Schema({
  name: String,
  id: String,
  porcentaje: Number,
  quarterCount: Number,
  price: Number,
  assigmentT: String,
  dates: String,
  CODSubject: String,
  CODCareer: String,
  CODFaculty: String,
  students: String,
  status: Number,
  cupos: Number,
  teacher: String,
});

const subject = mongoose.model("Subjects", subjectSchema);

module.exports = subject;
