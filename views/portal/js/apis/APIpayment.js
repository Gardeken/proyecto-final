export const agregarDeuda = async (idUser, idQuarter, deuda, CODSubject) => {
  const crear = await axios.post("/api/payment/agregar-deuda", {
    idUser,
    idQuarter,
    deuda,
    CODSubject,
  });
  return crear;
};

export const buscarDeuda = async (idUser, idQuarter) => {
  const consulta = await axios.get("/api/payment/buscar-pago", {
    params: {
      idUser,
      idQuarter,
    },
  });
  return consulta;
};

export const actualizarDeuda = async (idUser, idQuarter, deuda, CODSubject) => {
  const actualizar = await axios.put("/api/payment/actualizar-deuda", {
    idUser,
    idQuarter,
    deuda,
    CODSubject,
  });
  return actualizar;
};

export const buscarDeudas = async (idUser) => {
  const consulta = await axios.get("/api/payment/buscar-deudas", {
    params: {
      idUser,
    },
  });
  return consulta;
};

export const aceptarPay = async (email, idUser, mount, idQuarter) => {
  const aceptar = await axios.put("/api/payment/aceptar-pago", {
    email,
    idUser,
    mount,
    idQuarter,
  });
  return aceptar;
};
