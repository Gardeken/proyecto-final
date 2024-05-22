const subjectRouter = require("express").Router();
const subject = require("../model/subject");

subjectRouter.get("/buscar-materia", async (req, res) => {
  const { id } = req.query;
  const materia = await subject.findOne({ id: id });
  if (materia) {
    res.status(200).json(materia);
  } else {
    res.status(404).json({ message: "No se encontró la materia" });
  }
});

module.exports = subjectRouter;
