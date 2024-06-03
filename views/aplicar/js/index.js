const action_list1 = document.querySelector("#action-list1"),
  list1 = document.querySelector("#list1"),
  list2 = document.querySelector("#list2"),
  arrow1 = document.querySelector("#arrow"),
  inicio = document.querySelector("#inicio"),
  event2 = document.querySelector("#event2"),
  event3 = document.querySelector("#event3"),
  lateral = document.querySelector("#lateral"),
  btn_close = document.querySelector("#close"),
  bg = document.querySelector(".bg");
// mostrar primer listado

inicio.addEventListener("click", (e) => {
  evento1(e);
});

function evento1(e) {
  if (e.target.id === "action-list1") {
    action_list1.classList.toggle("color-sec");
    list1.classList.toggle("display");
  } else {
    action_list1.classList.remove("color-sec");
    list1.classList.remove("display");
  }
}

//animacion mostrar listado en barra lateral

event2.addEventListener("click", () => {
  list2.classList.toggle("show");
  arrow1.classList.toggle("arrow-animation");
});

//animacion barra lateral

event3.addEventListener("click", () => {
  bg.classList.toggle("show");
  lateral.classList.toggle("lateral-animation");
});

//cerrar barra lateral

btn_close.addEventListener("click", () => {
  bg.classList.toggle("show");
  lateral.classList.toggle("lateral-animation");
});

// funcionalidades

document.addEventListener("DOMContentLoaded", async () => {
  await cargarModulos();
  flatpickr("#fechaNam", {
    dateFormat: "d-m-Y",
  });
  flatpickr("#fechaGrad", {
    minDate: "today",
    dateFormat: "d-m-Y",
  });
  flatpickr("#fechaSol", {
    minDate: "today",
    dateFormat: "d-m-Y",
  });
  const cedulaImg = document.querySelector("#cedulaImg");
  const tituloImg = document.querySelector("#tituloImg");
  const notasImg = document.querySelector("#notasImg");
  const opsuImg = document.querySelector("#opsuImg");
  const partidaNacImg = document.querySelector("#partidaNacImg");
  const conductaImg = document.querySelector("#conductaImg");
  const servicioImg = document.querySelector("#servicioImg");

  const delCedula = document.querySelector("#delCedula");
  const delTitulo = document.querySelector("#delTitulo");
  const delNotas = document.querySelector("#delNotas");
  const delOpsu = document.querySelector("#delOpsu");
  const delPartida = document.querySelector("#delPartida");
  const delConducta = document.querySelector("#delConducta");
  const delServicio = document.querySelector("#delServicio");

  deleteFile(delCedula, cedulaImg);
  deleteFile(delTitulo, tituloImg);
  deleteFile(delNotas, notasImg);
  deleteFile(delOpsu, opsuImg);
  deleteFile(delPartida, partidaNacImg);
  deleteFile(delConducta, conductaImg);
  deleteFile(delServicio, servicioImg);

  eventoVal(cedulaImg);
  eventoVal(tituloImg);
  eventoVal(notasImg);
  eventoVal(opsuImg);
  eventoVal(partidaNacImg);
  eventoVal(conductaImg);
  eventoVal(servicioImg);
});

async function cargarModulos() {
  try {
    const selectInscrito = document.querySelector("#inscrito");
    const listadoModulos = await axios.get(
      "/api/quarter/listado-modulos-aplicar"
    );
    const { data } = listadoModulos;
    const objModulo = {
      101: "Módulo A",
      102: "Módulo B",
      103: "Módulo C",
      104: "Módulo de Verano",
    };
    data.forEach((i) => {
      const codigo = Number(i.quarter);
      const fecha = i.startDate.split("-");
      const año = fecha[2];
      const mesAct = new Date().getMonth() + 1;
      const fechaInscripcion = i.startinscDate.split("-");
      if (
        fechaInscripcion[0] <= new Date().getDate() &&
        fechaInscripcion[1] <= mesAct &&
        fechaInscripcion[2] <= new Date().getFullYear
      ) {
        return;
      }
      const option = document.createElement("option");
      option.value = i.quarter;
      option.innerHTML = `${objModulo[codigo]} - ${año}`;
      selectInscrito.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}

const selectPrograma = document.querySelector("#programa");

const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(formulario);
  const inputCheck = document.querySelector("#inputCheck");
  const inputs = document.getElementsByClassName("inputRequerido");
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.value === "") {
      return alert("No puede dejar los campos vacíos");
    }
  }
  if (!inputCheck.checked) {
    return alert("No ha aceptado las condiciones");
  }
  try {
    const crear = await axios.post("/api/student/crear-estudiante");
    const act = await axios.put("/api/student/act-crear-estudiante", data, {
      params: {
        id: crear.data.id,
      },
    });
    alert(act.data.message);
    formulario.reset();
  } catch (error) {
    console.log(error);
  }
});

selectPrograma.addEventListener("change", () => {
  const carrera = selectPrograma.value;
  const falcultad = document.querySelector("#facultad");

  if (carrera === "2000" || carrera === "2001" || carrera === "2002") {
    falcultad.value = "3001";
  }
  if (carrera === "2003" || carrera === "2004" || carrera === "2005") {
    falcultad.value = "3002";
  }
  if (carrera === "2006") {
    falcultad.value = "3003";
  }
  if (carrera === "2007" || carrera === "2008") {
    falcultad.value = "3005";
  }
});

function deleteFile(inputdel, input) {
  inputdel.addEventListener("click", () => {
    input.value = "";
  });
}

function eventoVal(input) {
  input.addEventListener("change", () => {
    const tamaño = transformarBytes(input.files[0].size);
    const extension = validarExtension(input.files[0].name, input);
    if (extension) {
      return alert("Solo se pueden enviar archivos comprimidos (.zip o .rar)");
    }
    if (tamaño > 10) {
      input.value = "";
      return alert("No puede mandar un archivo tan pesado");
    }
  });
}

function transformarBytes(size) {
  const kilobyte = size / 1000;
  const megabyte = kilobyte / 1000;
  return megabyte;
}

function validarExtension(nombre, input) {
  const extension = nombre.split(".");
  if (extension[1] === "zip") {
    return false;
  } else if (extension[1] === "rar") {
    return false;
  } else {
    input.value = "";
    return true;
  }
}
