const mongoose = require("mongoose");
const studentsRouter = require("../controllers/students.js");

const studentSchema = mongoose.Schema({
  username: String,
  password: String,
  id: String,
  email: String,
  rol: Number,
});

const student = mongoose.model("Students", studentSchema);

module.exports = student;
