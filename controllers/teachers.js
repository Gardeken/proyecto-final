const teacherRouter = require("express").Router();
const teacher = require("../model/teacher");
const user = require("../model/user");
const subject = require("../model/subject");

teacherRouter.get("/buscar-prof", async (req, res) => {
  const { id } = req.query;
  const prof = await teacher.findOne({ id: id });
  if (prof) {
    res.json(prof);
  } else {
    res.status(400).json({ error: "No se ha encontrado el profesor" });
  }
});

teacherRouter.put("/act-mat-prof", async (req, res) => {
  const { idUser, idSubject } = req.body;
  const validar = await teacher.findOne({ id: idUser });
  const lista = [`${idSubject}`];
  if (validar.subjects) {
    const listado = JSON.parse(validar.subjects);
    listado.push(idSubject.toString());
    try {
      await teacher.findOneAndUpdate(
        { id: idUser },
        {
          subjects: JSON.stringify(listado),
        }
      );
      res.status(200).json({
        message: "Se ha guardado con éxito la materia",
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        message: "Hubo un error al guardar la materia",
      });
    }
  } else {
    try {
      await teacher.findOneAndUpdate(
        { id: idUser },
        {
          subjects: JSON.stringify(lista),
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

module.exports = teacherRouter;
