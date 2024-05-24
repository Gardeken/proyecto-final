const assigmentRouter = require("express").Router();
const assigment = require("../model/assigment");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "asignaciones");
  },
  filename: function (req, file, cb) {
    const exp = file.originalname.split(".");
    cb(null, file.fieldname + "-" + Date.now() + "." + exp[1]);
  },
});
const upload = multer({ storage });

assigmentRouter.post(
  "/guardar-asigT",
  upload.single("teacherAsig"),
  async (req, res) => {
    const { campos } = req.body;
    const { idUser, idSubject } = req.query;
    const newAssigment = new assigment();
    const id = Date.now();
    const objAsig = {};
    for (let i = 0; i < campos.length; i++) {
      const elemntAsig = campos[i];
      objAsig[i] = elemntAsig;
    }
    newAssigment.user = idUser;
    newAssigment.subject = idSubject;
    newAssigment.id = id;
    newAssigment.name = objAsig["0"];
    newAssigment.date = objAsig["1"];
    newAssigment.description = objAsig["2"];

    if (req.file) {
      newAssigment.path = req.file.path;
    }
    newAssigment.save();
    res.status(200).json({
      message: "Asignacion creada con exito",
    });
  }
);

module.exports = assigmentRouter;
