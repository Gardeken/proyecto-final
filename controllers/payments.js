const paymentRouter = require("express").Router();
const payment = require("../model/payment");

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

paymentRouter.put("/actualizar-deuda", async (req, res) => {
  const { idUser, idQuarter, deuda } = req.body;
  const consulta = await payment.findOne({ idUser, idQuarter });
  try {
    await payment.findOneAndUpdate(
      { idUser, idQuarter },
      {
        deuda: consulta.deuda + deuda,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

paymentRouter.post("/agregar-deuda", async (req, res) => {
  const { idUser, idQuarter, deuda } = req.body;
  const newPayment = new payment();
  newPayment.id = Date.now();
  newPayment.idUser = idUser;
  newPayment.idQuarter = idQuarter;
  newPayment.deuda = deuda;
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
