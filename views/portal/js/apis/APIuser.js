export const buscarUsuario = async (id) => {
  const usuario = await axios.get("/api/user/buscar-usuario", {
    params: {
      id: id,
    },
  });
  return usuario;
};

export const buscarRol = async (rol) => {
  const listado = await axios.get("/api/user/buscar-rol", {
    params: {
      rol: rol,
    },
  });
  return listado;
};
