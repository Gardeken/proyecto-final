const mongoose = require("mongoose");
const quarterRouter = require("../controllers/assigmentsE");

const quarterSchema = new mongoose.Schema({
  startDate: String,
  endDate: String,
  quarter: String,
  id: String,
  COD: String,
  status: {
    type: Number,
    default: 2,
  },
  subjects3: String,
  subjects6: String,
});

const trimestre = mongoose.model("Quarter", quarterSchema);

module.exports = trimestre;
