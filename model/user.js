const mongoose = require("mongoose");
const userRouter = require("../controllers/users.js");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  id: String,
  email: String,
  rol: Number,
  name: String,
});

const user = mongoose.model("Users", userSchema);

module.exports = user;
