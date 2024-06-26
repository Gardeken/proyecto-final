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
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "gardeken1205@gmail.com",
    pass: process.env.password,
  },
});

assigmentERouter.put("/guardar-nota", async (req, res) => {
  const { idAsig, grade, email } = req.body;
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
    console.log(email);
    await transporter.sendMail({
      from: '"Universidad José María Vargas" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Se ha corregido una asignación",
      text: `Tienes asignaciones corregidas ve a revisarlas`,
    });
    res.status(200).json({
      message: "La asignación se ha corregido con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al corregir la asignación",
    });
  }
});

assigmentERouter.get("/listado-asig-est", async (req, res) => {
  const { idUser, idSubject } = req.query;
  try {
    const listado = await AssigmentE.find({ user: idUser, subject: idSubject });
    res.status(200).json(listado);
  } catch (error) {
    res.status(400).json({
      message: "No se han conseguido asignaciones",
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
  try {
    const asignacion = await AssigmentE.findOne({
      user: idUser,
      assigmentT: idAsigT,
    });
    res.status(200).json(asignacion);
  } catch (error) {
    res.status(404).json({
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
    const { idUser, idAsigT, idSubject, porcentaje } = req.query;
    const id = Date.now();
    const newAssigmentE = new AssigmentE();
    newAssigmentE.user = idUser;
    newAssigmentE.porcentaje = Number(porcentaje);
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
      idAsigT: eliminar.assigmentT,
      message: "La asignación se ha eliminado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al eliminar la asignación",
    });
  }
});

module.exports = assigmentERouter;
