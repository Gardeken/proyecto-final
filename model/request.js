const mongoose = require("mongoose");
const requestRouter = require("../controllers/requests");

const requestSchema = new mongoose.Schema({
  type: String,
  data: String,
  status: {
    type: Number,
    default: 1,
  },
  id: String,
  idUser: String,
});

const request = mongoose.model("Requests", requestSchema);

module.exports = request;
