export const cambioDatos = async (id, data1, data2, data3) => {
  const send = await axios.post("/api/request/cambioDatos", {
    id,
    data1,
    data2,
    data3,
  });
  return send;
};

export const listadoRequestStaff = async () => {
  const listado = await axios.get("/api/request/listado-staff");
  return listado;
};

export const listadoRequestAdmin = async () => {
  const listado = await axios.get("/api/request/listado-admin");
  return listado;
};

export const aceptarReq = async (idReq) => {
  const aceptar = await axios.put("/api/request/aceptar-peticion", { idReq });
  return aceptar;
};

export const rechazarReq = async (idReq) => {
  const rechazar = await axios.put("/api/request/rechazar-peticion", {
    idReq,
  });
  return rechazar;
};

export const eliminarReq = async (idReq, data) => {
  const eliminar = await axios.delete("/api/request/eliminar-peticion", {
    params: {
      data,
      idReq,
    },
  });
  return eliminar;
};

export const listadoRequestFilt = async (filter) => {
  const listado = await axios.get("/api/request/listado-filtrado", {
    params: {
      filter,
    },
  });
  return listado;
};

export const crearSubject = async (data, idUser, IDquarter) => {
  const crear = await axios.post("/api/request/crearMateria", data, {
    params: {
      IDquarter,
      idUser,
    },
  });
  return crear;
};

export const procesarPago = async (data, idUser, idQuarter) => {
  const crear = await axios.post("/api/request/procesar-pago", data, {
    params: {
      idUser,
      idQuarter,
    },
  });
  return crear;
};
