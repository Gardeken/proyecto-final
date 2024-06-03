export const buscarCarrerasFac = async (idFac) => {
  const listado = await axios.get("/api/infocareer/buscar-carrerasFac", {
    params: {
      idFac,
    },
  });
  return listado;
};
