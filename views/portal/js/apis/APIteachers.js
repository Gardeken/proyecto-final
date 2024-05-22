export const buscarProfesor = async (id) => {
  const prof = await axios.get("/api/teacher/buscar-prof", {
    params: {
      id: id,
    },
  });
  return prof;
};
