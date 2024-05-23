const mongoose = require("mongoose");
const studentsRouter = require("../controllers/students.js");

const studentSchema = new mongoose.Schema({
  id: String,
  subjects: String,
  telefono: String,
  telfCasa: String,
  calle: String,
  ciudad: String,
  estado: String,
  codigopost: String,
  pais: String,
  fechaNac: String,
  Sexo: String,
  cedulaPath: String,
  tituloPath: String,
  notasPath: String,
  opsuPath: String,
  nacimientoPath: String,
  conductaPath: String,
  militarPath: String,
  lugarNac: String,
  nacinalinadad: String,
  estCivil: String,
  inscrito: String,
  programa: String,
  cnu: String,
  nomEmer: String,
  relacion: String,
  telfEmer: String,
  telfEmerCasa: String,
  telfEmerTr: String,
  nomRep: String,
  relacionRep: String,
  telfRep: String,
  emailRep: String,
  calleRep: String,
  ciudadRep: String,
  estadoRep: String,
  paisRep: String,
  codigopostRep: String,
  plantel: String,
  tipoPlantel: String,
  especialidad: String,
  rendimiento: String,
  ciudadPlantel: String,
  estadoPlantel: String,
  paisPlantel: String,
  Trabaja: String,
  sector: String,
  nomEm: String,
  direcEm: String,
  ciudadEm: String,
  estadoEm: String,
  paisEm: String,
  nomSup: String,
  telfEm: String,
  instU: String,
  tituloObt: String,
  fechaGrad: String,
  discapacidad: String,
  descDisc: String,
  difAp: String,
  descDif: String,
  fechaSol: String,
  fullName: String,
  fullNameRep: String,
  pendding: {
    type: Boolean,
    default: true,
  },
});

const student = mongoose.model("Students", studentSchema);

module.exports = student;