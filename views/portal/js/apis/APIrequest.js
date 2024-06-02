export const cambioDatos = async (id, data1, data2, data3) => {
  const send = await axios.post("/api/request/cambioDatos", {
    id,
    data1,
    data2,
    data3,
  });
  return send;
};

export const listadoRequestStaff = async (filter) => {
  const listado = await axios.get("/api/request/listado-staff");
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

export const eliminarReq = async (idReq) => {
  const eliminar = await axios.delete("/api/request/eliminar-peticion", {
    params: {
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
