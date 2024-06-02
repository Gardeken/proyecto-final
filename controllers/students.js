const studentRouter = require("express").Router();
const student = require("../model/student");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "aplicaciones");
  },
  filename: function (req, file, cb) {
    const exp = file.originalname.split(".");
    cb(null, file.fieldname + "-" + Date.now() + "." + exp[1]);
  },
});
const upload = multer({ storage });

studentRouter.get("/buscar-est", async (req, res) => {
  const { id } = req.query;
  const estudiante = await student.findOne({ id: id });
  if (estudiante) {
    res.status(200).json(estudiante);
  } else {
    res.status(400).json({
      error: "No se encontro el estudiante",
    });
  }
});

studentRouter.put("/act-alumno", async (req, res) => {
  const { id } = req.query;
  try {
    await student.findOneAndUpdate({ id }, req.body);
    res.status(200).json({
      message: "Los cambios se han realizado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al guardar los cambios",
    });
  }
});

studentRouter.post("/crear-estudiante", async (req, res) => {
  const newStudent = new student();
  const idStudent = Date.now();
  newStudent.id = idStudent;
  try {
    await newStudent.save();
    res.status(200).json({
      id: idStudent,
      message: "El estudiante se ha creado con éxito",
    });
  } catch (error) {}
});

studentRouter.put(
  "/act-crear-estudiante",
  upload.fields([
    { name: "cedulaImg" },
    { name: "tituloImg" },
    { name: "notasImg" },
    { name: "opsuImg" },
    { name: "partidaNacImg" },
    { name: "conductaImg" },
    { name: "servicioImg" },
  ]),
  async (req, res) => {
    const { id } = req.query;
    try {
      await student.findOneAndUpdate({ id: id }, req.body);
      await student.findOneAndUpdate(
        { id: id },
        {
          cedulaPath: req.files.cedulaImg[0].path,
          tituloPath: req.files.tituloImg[0].path,
          notasPath: req.files.notasImg[0].path,
          opsuPath: req.files.opsuImg[0].path,
          nacimientoPath: req.files.partidaNacImg[0].path,
          militarPath: req.files.servicioImg[0].path,
          conductaPath: req.files.conductaImg[0].path,
        }
      );
      res.status(200).json({
        message: "Se ha enviado la petición",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = studentRouter;
