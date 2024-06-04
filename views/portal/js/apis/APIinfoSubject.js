export const buscarInfoMateria = async (filtro) => {
  const listado = await axios.get("/api/infosubject/buscar-materiasFilt", {
    params: {
      filtro,
    },
  });
  return listado;
};

export const buscarRequerimientos = async (CODSubject) => {
  const consulta = await axios.get("/api/infosubject/requirements", {
    params: {
      CODSubject,
    },
  });
  return consulta;
};
