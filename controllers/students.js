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
const fs = require("fs");

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

studentRouter.put("/agregar-materias", async (req, res) => {
  const { idStudent, idSubject } = req.body;
  const consulta = await student.findOne({ id: idStudent });
  const lista = [idSubject.toString()];
  try {
    if (consulta.subjects) {
      const listado = JSON.parse(consulta.subjects);
      listado.push(idSubject.toString());
      await student.findOneAndUpdate(
        { id: idStudent },
        { subjects: JSON.stringify(listado) }
      );
      res.status(200).json({
        message: "Materia agregada con éxito",
      });
    } else {
      await student.findOneAndUpdate(
        { id: idStudent },
        { subjects: JSON.stringify(lista) }
      );
      res.status(200).json({
        message: "Materia agregada con éxito",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al agregar la materia",
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

studentRouter.put("/aceptar-al", async (req, res) => {
  const { idStudent } = req.body;
  try {
    await student.findOneAndUpdate(
      { id: idStudent },
      {
        pendding: false,
      }
    );
    res.status(200).json({
      message: "Se ha creado el usuario con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear el usuario",
    });
  }
});

studentRouter.put("/act-materias-est", async (req, res) => {
  const { idStudent, CODSubject } = req.body;
  const validar = await student.findOne({ id: idStudent });
  const lista = [CODSubject.toString()];
  if (validar.listSubjects) {
    try {
      const listado = JSON.parse(validar.listSubjects);
      listado.push(CODSubject.toString());
      await student.findOneAndUpdate(
        { id: idStudent },
        {
          listSubjects: JSON.stringify(listado),
        }
      );
      res.status(200).json({
        message: "Se ha guardado con éxito la materia",
      });
    } catch (error) {
      res.status(400).json({
        message: "Hubo un error al guardar la materia",
      });
    }
  } else {
    try {
      await student.findOneAndUpdate(
        { id: idStudent },
        {
          listSubjects: JSON.stringify(lista),
        }
      );
      res.status(200).json({
        message: "Se ha guardado con éxito la materia",
      });
    } catch (error) {
      res.status(400).json({
        message: "Hubo un error al guardar la materia",
      });
    }
  }
});

studentRouter.delete("/eliminar-est", async (req, res) => {
  const {
    idStudent,
    cedulaPath,
    conductaPath,
    militarPath,
    nacimientoPath,
    notasPath,
    opsuPath,
    tituloPath,
  } = req.query;

  const listadoPaths = [
    cedulaPath,
    conductaPath,
    militarPath,
    nacimientoPath,
    notasPath,
    opsuPath,
    tituloPath,
  ];

  try {
    await student.findOneAndDelete({ id: idStudent });
    listadoPaths.forEach((i) => {
      fs.unlink(i, (err) => {
        if (err) {
          res.status(400).json({
            message: "Hubo un error al eliminar la asignación",
          });
        }
      });
    });
    res.status(200).json({
      message: "Se ha eliminado el estudiante con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

module.exports = studentRouter;
