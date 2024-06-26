const mongoose = require("mongoose");
const quarterRouter = require("../controllers/assigmentsE");

const quarterSchema = new mongoose.Schema({
  startDate: String,
  endDate: String,
  quarter: String,
  id: String,
  COD: String,
  startinscDate: String,
  endinscDate: String,
  startcreateDate: String,
  endcreateDate: String,
  status: {
    type: Number,
    default: 3,
  },
  subjects3: String,
  subjects6: String,
});

const trimestre = mongoose.model("Quarter", quarterSchema);

module.exports = trimestre;
