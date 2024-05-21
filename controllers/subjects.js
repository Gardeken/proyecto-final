const subjectRouter = require("express").Router();
const subject = require("../model/subject");

subjectRouter.get("/buscar-materias", async (req, res) => {
  const { idMateria } = req.query;
  const materia = await subject.findOne({ id: idMateria });
  if (materia) {
    res.status(200).json({
      nombreMateria: materia.name,
    });
  } else {
    res.status(404).json({ message: "No se encontró la materia" });
  }
});

module.exports = subjectRouter;
