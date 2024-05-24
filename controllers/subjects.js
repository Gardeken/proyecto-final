const subjectRouter = require("express").Router();
const subject = require("../model/subject");
const axios = require("axios");

subjectRouter.get("/buscar-materia", async (req, res) => {
  const { id } = req.query;
  const materia = await subject.findOne({ id: id });
  if (materia) {
    res.status(200).json(materia);
  } else {
    res.status(404).json({ message: "No se encontró la materia" });
  }
});

subjectRouter.put("/guardar-asigT", async (req, res) => {
  const { idAsig, idSubject } = req.body;
  try {
    const materia = await subject.findOne({ id: idSubject });
    const lista = [idAsig.toString()];
    if (materia.assigmentT) {
      let listadoAsig = JSON.parse(materia.assigmentT);
      listadoAsig.push(idAsig.toString());
      await subject.findOneAndUpdate(
        { id: idSubject },
        {
          assigmentT: JSON.stringify(listadoAsig),
        }
      );
    } else {
      const agregar = await subject.findOneAndUpdate(
        { id: idSubject },
        {
          assigmentT: JSON.stringify(lista),
        }
      );
    }
    res.status(200).json({ message: "Se ha creado con éxito la asignación" });
  } catch (error) {
    res.status(400).json({
      message: "No se pudo guardar la asignación",
    });
  }
});

module.exports = subjectRouter;
