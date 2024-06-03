export const buscarInfoMateria = async (filtro) => {
  const listado = await axios.get("/api/infosubject/buscar-materiasFilt", {
    params: {
      filtro,
    },
  });
  return listado;
};
