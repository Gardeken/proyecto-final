const mongoose = require("mongoose");
const assigmentERouter = require("../controllers/assigmentsE");

const assigmentSchema = new mongoose.Schema({
  path: String,
  id: String,
  user: String,
  grades: Number,
  assigmentT: String,
  subject: String,
});

const AssigmentE = mongoose.model("AssigmentE", assigmentSchema);

module.exports = AssigmentE;
