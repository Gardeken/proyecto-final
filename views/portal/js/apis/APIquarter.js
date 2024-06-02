export const guardarTrimestre = async (
  startDate,
  endDate,
  quarter,
  inscDate,
  createDate
) => {
  const trimestre = await axios.post("/api/quarter/guardar-trimestre", {
    startDate,
    endDate,
    IDquarter: quarter,
    inscDate,
    createDate,
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
