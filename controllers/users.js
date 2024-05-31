const userRouter = require("express").Router();
const user = require("../model/user");
const subjectRouter = require("./subjects");
const subject = require("../model/subject");

userRouter.get("/consulta-login", async (req, res) => {
  const { usuario, password } = req.query;

  const consulta = await user.findOne({ username: usuario });
  if (consulta) {
    if (consulta.password === password) {
      let roles = {
        1: `/portalUJMV?rol=staff${"&"}id=${consulta.id}`,
        2: `/portalUJMV?rol=admin${"&"}id=${consulta.id}`,
        3: `/portalUJMV?rol=teacher${"&"}id=${consulta.id}`,
        4: `/portalUJMV?rol=student${"&"}id=${consulta.id}`,
      };

      res.status(200).json({
        path: roles[consulta.rol],
      });
    } else {
      res.status(400).json({ message: "Contraseña incorrecta" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

userRouter.get("/buscar-usuario", async (req, res) => {
  const { id } = req.query;
  const consulta = await user.findOne({ id: id });
  if (consulta) {
    res.status(200).json(consulta);
  } else {
    res.status(400).json({
      message: "Usuario no encontrado",
    });
  }
});

userRouter.get("/buscar-rol", async (req, res) => {
  const { rol } = req.query;
  try {
    const consulta = await user.find({ rol: rol });
    res.status(200).json(consulta);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

userRouter.put("/act-user", async (req, res) => {
  const { id } = req.query;
  try {
    await user.findOneAndUpdate({ id }, req.body);
    res.status(200).json({
      message: "Los cambios se han realizado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al guardar los cambios",
    });
  }
});

module.exports = userRouter;
