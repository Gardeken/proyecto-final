const infoSubjectRouter = require("express").Router();
const infoSubject = require("../model/infoSubject");

infoSubjectRouter.get("/buscar-materiasFilt", async (req, res) => {
  const { filtro } = req.query;
  const listado = await infoSubject.find(filtro);
  res.status(200).json(listado);
});

infoSubjectRouter.get("/requirements", async (req, res) => {
  const { CODSubject } = req.query;
  const consulta = await infoSubject.findOne({ CODSubject });
  res.status(200).json(consulta);
});

module.exports = infoSubjectRouter;
