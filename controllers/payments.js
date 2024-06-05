require("dotenv").config();
const paymentRouter = require("express").Router();
const payment = require("../model/payment");
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

paymentRouter.put("/aceptar-pago", async (req, res) => {
  const { email, idUser, mount, idQuarter } = req.body;
  try {
    const consulta = await payment.findOne({ idUser, idQuarter });
    await payment.findOneAndUpdate(
      { idUser, idQuarter },
      {
        deuda: consulta.deuda - mount,
      }
    );
    await transporter.sendMail({
      from: '"Universidad José María Vargas" <dominicode.xyz@gmail.com>',
      to: `${email}`,
      subject: "Pago procesado",
      text: "Tu pago ha sido procesado exitósamente",
    });
    res.status(200).json({
      message: "Pago procesado exitósamente",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar pago",
    });
  }
});

paymentRouter.get("/buscar-pago", async (req, res) => {
  const { idUser, idQuarter } = req.query;
  const consulta = await payment.find({
    idUser,
    idQuarter,
  });
  if (consulta) {
    res.status(200).json(consulta);
  } else {
    res.status(404).json({ message: "No se encontró el pago" });
  }
});

paymentRouter.get("/buscar-deudas", async (req, res) => {
  const { idUser } = req.query;
  try {
    const consulta = await payment.find({ idUser });
    res.status(200).json(consulta);
  } catch (error) {
    res.status(404).json({
      message: "No se consiguieron deudas",
    });
  }
});

paymentRouter.put("/actualizar-deuda", async (req, res) => {
  const { idUser, idQuarter, deuda, CODSubject } = req.body;
  const consulta = await payment.findOne({ idUser, idQuarter });
  const listado = JSON.parse(consulta.subjects);
  listado.push(CODSubject.toString());
  try {
    await payment.findOneAndUpdate(
      { idUser, idQuarter },
      {
        deuda: consulta.deuda + deuda,
        subjects: JSON.stringify(listado),
      }
    );
  } catch (error) {
    console.log(error);
  }
});

paymentRouter.post("/agregar-deuda", async (req, res) => {
  const { idUser, idQuarter, deuda, CODSubject } = req.body;
  const lista = [CODSubject.toString()];
  const newPayment = new payment();
  newPayment.id = Date.now();
  newPayment.idUser = idUser;
  newPayment.idQuarter = idQuarter;
  newPayment.deuda = deuda;
  newPayment.subjects = JSON.stringify(lista);
  try {
    await newPayment.save();
    res.status(200).json({
      message: "Se ha creado la factura",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear la factura",
    });
  }
});

module.exports = paymentRouter;
