const mongoose = require("mongoose");
const subjectRouter = require("../controllers/subjects.js");

const subjectSchema = new mongoose.Schema({
  name: String,
  id: String,
  assigmentT: String,
  assigmentE: String,
  dates: String,
  students: String,
  teacher: String,
});

subjectSchema.set("toJSON", {
  transform: (document, returOBJ) => {
    returOBJ.id = returOBJ._id.toString();
    delete returOBJ._id;
  },
});

const subject = mongoose.model("Subjects", subjectSchema);

module.exports = subject;
