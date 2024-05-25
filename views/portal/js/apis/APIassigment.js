export const buscarAsignacion = async (id) => {
  const asignacion = await axios.get("/api/assigment/buscar-asig", {
    params: {
      id: id,
    },
  });
  return asignacion;
};
