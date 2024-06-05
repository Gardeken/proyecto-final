export const agregarDeuda = async (idUser, idQuarter, deuda) => {
  const crear = await axios.post("/api/payment/agregar-deuda", {
    idUser,
    idQuarter,
    deuda,
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

export const actualizarDeuda = async (idUser, idQuarter, deuda) => {
  const actualizar = await axios.put("/api/payment/actualizar-deuda", {
    idUser,
    idQuarter,
    deuda,
  });
  return actualizar;
};
