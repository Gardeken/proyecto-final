export const guardarTrimestre = async (startDate, endDate, quarter) => {
  const trimestre = await axios.post("/api/quarter/guardar-trimestre", {
    startDate,
    endDate,
    IDquarter: quarter,
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
