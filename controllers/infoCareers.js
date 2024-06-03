const infoCareerRouter = require("express").Router();
const infoCareer = require("../model/infoCareer");

infoCareerRouter.get("/buscar-carrerasFac", async (req, res) => {
  const { idFac } = req.query;
  const listado = await infoCareer.find({ CODFaculty: idFac });
  res.status(200).json(listado);
});

module.exports = infoCareerRouter;
