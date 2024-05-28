const assigmentERouter = require("express").Router();
const AssigmentE = require("../model/assigmentE");
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
const fs = require("fs");

assigmentERouter.put("/guardar-nota", async (req, res) => {
  const { idAsig, grade } = req.body;
  if (!grade) {
    res.status(400).json({
      message: "Usted no puede dejar el campo vacío",
    });
  }
  try {
    const update = await AssigmentE.findOneAndUpdate(
      { id: idAsig },
      {
        grades: grade,
      }
    );
    res.status(200).json({
      message: "La asignación se ha corregido con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al corregir la asignación",
    });
  }
});

assigmentERouter.get("/buscar-listado", async (req, res) => {
  const { idAsigT } = req.query;
  try {
    const listado = await AssigmentE.find({ assigmentT: idAsigT });
    res.status(200).json(listado);
  } catch (error) {
    res.status(400).json({
      message: "Error al conseguir el listado",
    });
  }
});

assigmentERouter.get("/buscar-una-asig", async (req, res) => {
  const { idAsigT, idUser } = req.query;
  const asignacion = await AssigmentE.findOne({
    user: idUser,
    assigmentT: idAsigT,
  });
  if (asignacion) {
    res.status(200).json(asignacion);
  } else {
    res.status(400).json({
      message: "No se encontro la asignacion",
    });
  }
});

assigmentERouter.get("/buscar-asigE", async (req, res) => {
  const { id } = req.query;
  try {
    const asignacionE = await AssigmentE.findOne({ id: id });
    res.status(200).json(asignacionE);
  } catch (error) {
    res.status(400).json({
      message: "No se consiguió la asignación",
    });
  }
});

assigmentERouter.post(
  "/guardar-asigE",
  upload.single("studentAsig"),
  async (req, res) => {
    if (req.file === undefined) {
      return res.status(400).json({
        message: "Tiene que cargar un archivo antes de enviar",
      });
    }
    const { path } = req.file;
    const { idUser, idAsigT, idSubject } = req.query;
    const id = Date.now();
    const newAssigmentE = new AssigmentE();
    newAssigmentE.user = idUser;
    newAssigmentE.subject = idSubject;
    newAssigmentE.assigmentT = idAsigT;
    newAssigmentE.id = id;
    newAssigmentE.path = path;
    try {
      await newAssigmentE.save();
      res.status(200).json({
        id: id,
        message: "Asignación guardada con éxito",
      });
    } catch (error) {
      res.status(400).json({
        message: "Error al guardar la asignación",
      });
    }
  }
);

assigmentERouter.delete("/eliminar-asig", async (req, res) => {
  const { idAsig, path } = req.query;
  try {
    const eliminar = await AssigmentE.findOneAndDelete({ id: idAsig });
    fs.unlink(path, (err) => {
      if (err) {
        res.status(400).json({
          message: "Hubo un error al eliminar la asignación",
        });
      }
    });
    res.status(200).json({
      message: "La asignación se ha eliminado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al eliminar la asignación",
    });
  }
});

module.exports = assigmentERouter;
