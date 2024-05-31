const assigmentRouter = require("express").Router();
const axios = require("axios");
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
    const validation = campos.some((i) => i === "" || i === " ");
    if (validation) {
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }
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
    try {
      newAssigment.save();
      res.status(200).json({
        message: "Asignacion creada con exito",
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

assigmentRouter.put("/guardar-asigE", async (req, res) => {
  const { idAsigE, idAsigT } = req.body;
  const asignacionT = await assigment.findOne({ id: idAsigT });
  if (asignacionT.assigmentE) {
    const listado = JSON.parse(asignacionT.assigmentE);
    listado.push(idAsigE.toString());

    try {
      await assigment.findOneAndUpdate(
        { id: idAsigT },
        {
          assigmentE: JSON.stringify(listado),
        }
      );
      res.status(200).json({
        message: "Se ha guardado la asignación con éxito",
      });
    } catch (error) {
      res.status(400).json({
        message: "Error al guardar la asignación",
      });
    }
  } else {
    try {
      await assigment.findOneAndUpdate(
        { id: idAsigT },
        {
          assigmentE: JSON.stringify([idAsigE.toString()]),
        }
      );
      res.status(200).json({
        message: "Se ha guardado la asignación con éxito",
      });
    } catch (error) {
      res.status(400).json({
        message: "Error al guardar la asignación",
      });
    }
  }
});

assigmentRouter.get("/buscar-asig", async (req, res) => {
  const { id } = req.query;
  try {
    const asignacion = await assigment.findOne({ id: id });
    res.status(200).json(asignacion);
  } catch (error) {
    res.status(400).json({
      message: "No se ha encontrado la asignación",
    });
  }
});

assigmentRouter.put("/act-listado-asigE", async (req, res) => {
  const { idAsigE, idAsigT } = req.body;
  try {
    const consulta = await assigment.findOne({ id: idAsigT });
    let listado = JSON.parse(consulta.assigmentE);
    listado = listado.filter((i) => i !== idAsigE);
    await assigment.findOneAndUpdate(
      { id: idAsigT },
      {
        assigmentE: JSON.stringify(listado),
      }
    );
    res.status(200).json({
      message: "La asignación se ha eliminado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar la asignación",
    });
  }
});

module.exports = assigmentRouter;
