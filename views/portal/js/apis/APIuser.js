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

export const crearUser = async (username, password, email, name, idStudent) => {
  const user = await axios.post("/api/user/crear-usuario-est", {
    username,
    password,
    email,
    name,
    idStudent,
  });
  return user;
};
