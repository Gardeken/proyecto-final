const studentRouter = require("express").Router();
const student = require("../model/student");

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

module.exports = studentRouter;
