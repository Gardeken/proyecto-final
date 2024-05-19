const mongoose = require("mongoose");
const assigmentRouter = require("../controllers/assigments");

const assigmentSchema = new mongoose.Schema({
  nombre: String,
  ruta: String,
  usuario: String,
});

assigmentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const assigment = mongoose.model("Assigment", assigmentSchema);

module.exports = assigment;
