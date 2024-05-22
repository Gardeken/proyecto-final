export const buscarMateria = async (id) => {
  const materia = await axios.get("/api/subject/buscar-materia", {
    params: {
      id: id,
    },
  });

  return materia;
};
