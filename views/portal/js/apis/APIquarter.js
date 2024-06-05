export const guardarTrimestre = async (
  startDate,
  endDate,
  quarter,
  inscDate,
  createDate,
  endinscDate,
  endcreateDate
) => {
  const trimestre = await axios.post("/api/quarter/guardar-trimestre", {
    startDate,
    endDate,
    IDquarter: quarter,
    inscDate,
    createDate,
    endinscDate,
    endcreateDate,
  });
  return trimestre;
};

export const listadoTrimestres = async () => {
  const listado = await axios.get("/api/quarter/listado-trimestres");
  return listado;
};

export const actualizarTrimestres = async () => {
  const trimestre = await axios.get("/api/quarter/actualizar-trimestre");
};

export const eliminarTrimestres = async (id) => {
  const eliminar = await axios.delete("/api/quarter/eliminar-trimestre", {
    params: {
      id,
    },
  });
  return eliminar;
};

export const validarCreate = async () => {
  const consulta = await axios.get("/api/quarter/validar-create-prof");
  return consulta;
};

export const validarInsc = async () => {
  const consulta = await axios.get("/api/quarter/validar-insc-al");
  return consulta;
};

export const buscarTrimestre = async (idQuarter) => {
  const consulta = await axios.get("/api/quarter/buscar-trimestre", {
    params: {
      idQuarter,
    },
  });
  return consulta;
};
