const mongoose = require("mongoose");
const teacherRouter = require("../controllers/teachers");

const teacherSchema = new mongoose.Schema({
  id: String,
  subjects: String,
});

const teacher = mongoose.model("Teachers", teacherSchema);

module.exports = teacher;
