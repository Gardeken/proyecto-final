const userRouter = require("express").Router();
const user = require("../model/user");
const subjectRouter = require("./subjects");
const subject = require("../model/subject");
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
  const { id, email } = req.query;
  try {
    await user.findOneAndUpdate({ id }, req.body);
    await transporter.sendMail({
      from: '"Universidad José María Vargas" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Tus datos han sido cambiados",
      text: `La petición de cambio de datos ha sido aceptada`,
    });
    res.status(200).json({
      message: "Los cambios se han realizado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al guardar los cambios",
    });
  }
});

userRouter.post("/crear-usuario-est", async (req, res) => {
  const { username, password, email, idStudent, name } = req.body;
  const consulta = await user.findOne({ username: username });
  if (consulta) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }
  const newUser = new user();
  newUser.username = username;
  newUser.password = password;
  newUser.email = email;
  newUser.id = idStudent;
  newUser.name = name;
  newUser.rol = 4;
  try {
    await newUser.save();
    await transporter.sendMail({
      from: '"Universidad José María Vargas" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Aplicación aceptado",
      text: `
      Tu aplicación ha sigo aceptado exitósamente: 
      Username: ${username}
      Contraseña: ${password}
      `,
    });
    res.status(200).json({
      message: "Se ha creado el usuario con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear el usuario",
    });
  }
});

module.exports = userRouter;
