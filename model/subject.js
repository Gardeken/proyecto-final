const mongoose = require("mongoose");
const subjectRouter = require("../controllers/subjects.js");

const subjectSchema = new mongoose.Schema({
  name: String,
  id: String,
  assigmentT: String,
  assigmentE: String,
});

const subject = mongoose.model("Subjects", subjectSchema);

module.exports = subject;
