const mongoose = require("mongoose");
const paymentRouter = require("../controllers/infoSubjects.js");

const paymentSchema = new mongoose.Schema({
  id: String,
  idUser: String,
  facturas: String,
  idQuarter: String,
  deuda: Number,
});

const payment = mongoose.model("payments", paymentSchema);

module.exports = payment;
