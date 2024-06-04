const mongoose = require("mongoose");
const assigmentRouter = require("../controllers/assigments");

const assigmentSchema = new mongoose.Schema({
  name: String,
  path: String,
  id: String,
  user: String,
  date: String,
  description: String,
  subject: String,
  porcentaje: Number,
  assigmentE: String,
});

const assigment = mongoose.model("Assigment", assigmentSchema);

module.exports = assigment;
