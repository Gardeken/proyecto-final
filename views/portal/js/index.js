import { buscarEstudiante, actAlumno } from "./apis/APIstudent.js";
import { buscarProfesor } from "./apis/APIteachers.js";
import { buscarMateria, guardarAsignacionMat } from "./apis/APIsubject.js";
import { buscarUsuario, buscarRol } from "./apis/APIuser.js";
import {
  cambioDatos,
  listadoRequestStaff,
  listadoRequestFilt,
  aceptarReq,
  rechazarReq,
  eliminarReq,
} from "./apis/APIrequest.js";
import {
  guardarTrimestre,
  listadoTrimestres,
  actualizarTrimestres,
  eliminarTrimestres,
} from "./apis/APIquarter.js";
import {
  buscarAsignacion,
  guardarAsignacion,
  guardarAsignacionEst,
  actAsigT,
} from "./apis/APIassigment.js";
import {
  buscarAsignacionE,
  guardarAsignacionEstudiante,
  listadoAsignaciones,
  buscarUnaAsig,
  corregirAsig,
  eliminarAsig,
  listadoAsigEst,
} from "./apis/APIassigmentE.js";

const objStatus = {
  0: "Inactivo",
  1: "Activo",
  2: "Pendiente",
};
const objStatusPet = {
  0: "Aceptada",
  1: "Pendiente",
  2: "Rechazada",
};
const objPeticion = {
  4001: "Cambio de datos",
  4002: "Aplicación",
  4003: "Crear Materia",
  4004: "Procesar Pago",
  4005: "Contactar",
};
const objModulo = {
  101: "Módulo A",
  102: "Módulo B",
  103: "Módulo C",
  104: "Módulo de Verano",
};
const listadoEst = [];
const listadoUser = [];
const containerMaterias = document.querySelector("#materias");
const listadoMaterias = document.querySelector(".listadoMaterias");
const containerMsg = document.querySelector("#containerMsg");
const message = document.querySelector("#message");
const modal = document.querySelector("#modal");
const containerModal = document.querySelector("#container-modal");
const URL = new URLSearchParams(window.location.search);
const rol = URL.get("rol");
const id = URL.get("id");

if (containerMaterias) {
  containerMaterias.addEventListener("click", (e) => {
    e.preventDefault();
    listadoMaterias.classList.toggle("hidden");
  });
}

function crearMsg(text) {
  containerMsg.classList.add("messageAnimation");
  message.innerHTML = text;

  setTimeout(() => {
    containerMsg.classList.remove("messageAnimation");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", async () => {
  actualizarTrimestres();
  if (rol === "student") {
    const usuario = await buscarEstudiante(id);
    printEst();
    return impListadoMat(usuario.data.subjects);
  }
  if (rol === "teacher") {
    const prof = await buscarProfesor(id);
    printProf();
    return impListadoMat(prof.data.subjects);
  }
  if (rol === "admin") {
    eventosAdmin();
  }
  if (rol === "staff") {
    eventosStaff();
  }
});

//eventos

async function eventosAdmin() {
  const searchSt = document.querySelector("#searchSt");
  searchSt.addEventListener("click", async () => {
    imprimirContainerAdmin();
    const containerEst = document.querySelector("#estudiantes");
    cargarEstudiantes();
    const studentName = document.querySelector("#studentName");
    const studentID = document.querySelector("#studentID");
    const studentEmail = document.querySelector("#studentEmail");

    studentEmail.addEventListener("input", () => {
      const email = studentEmail.value;
      if (!email) {
        containerEst.innerHTML = "";
        cargarEstudiantes();
      }
      const listadoUsertAct = listadoUser.filter((i) => i.email === email);
      if (listadoUsertAct[0] === undefined) {
        containerEst.innerHTML = "";
        return;
      }
      const listadoEstAct = listadoEst.filter(
        (i) => i.id === listadoUsertAct[0].id
      );
      containerEst.innerHTML = "";
      const div = document.createElement("div");
      div.classList.add("estudiante");
      div.id = listadoUsertAct[0].id;
      div.innerHTML = `
          <div id="${listadoUsertAct[0].id}" class="asignacion pointer"> 
          <p>${listadoEstAct[0].fullName}</p>
          <p>${listadoUsertAct[0].email}</p>
          <p>${listadoUsertAct[0].id}</p>
        </div>
        `;
      containerEst.appendChild(div);
    });

    studentName.addEventListener("input", () => {
      const name = studentName.value;
      if (!name) {
        containerEst.innerHTML = "";
        cargarEstudiantes();
      }
      const listadoEstAct = listadoEst.filter((i) => i.fullName === name);

      containerEst.innerHTML = "";
      listadoEstAct.map((i) => {
        const listadoUsertAct = listadoUser.filter((i) => i.id === i.id);
        const div = document.createElement("div");
        div.classList.add("estudiante");
        div.id = i.id;
        div.innerHTML = `
          <div id="${i.id}" class="asignacion pointer"> 
          <p>${i.fullName}</p>
          <p>${listadoUsertAct[0].email}</p>
          <p>${i.id}</p>
        </div>
        `;
        containerEst.appendChild(div);
      });
    });

    studentID.addEventListener("input", () => {
      const inputId = studentID.value;
      if (!inputId) {
        containerEst.innerHTML = "";
        cargarEstudiantes();
      }
      const listadoUsertAct = listadoUser.filter((i) => i.id === inputId);
      const listadoEstAct = listadoEst.filter((i) => i.id === inputId);
      if (listadoUsertAct[0] === undefined || listadoEstAct === undefined) {
        containerEst.innerHTML = "";
        return;
      }
      containerEst.innerHTML = "";
      const div = document.createElement("div");
      div.classList.add("estudiante");
      div.id = listadoUsertAct[0].id;
      div.innerHTML = `
          <div id="${listadoUsertAct[0].id}" class="asignacion pointer"> 
          <p>${listadoEstAct[0].fullName}</p>
          <p>${listadoUsertAct[0].email}</p>
          <p>${listadoUsertAct[0].id}</p>
        </div>
        `;
      containerEst.appendChild(div);
    });

    containerEst.addEventListener("click", async (e) => {
      if (
        e.target.parentElement.classList.contains("estudiante") ||
        e.target.parentElement.classList.contains("asignacion")
      ) {
        const id = e.target.parentElement.id;
        modal.classList.remove("hidden");
        containerModal.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <button id="editar" class="btn-est">Editar</button>
        <div class="container-inputEst">
          <label for="inputName">Nombre:</label>
          <input id="inputName" readonly class="inputEst" type="text" />
        </div>
        <div class="container-inputEst">
          <label for="inputEmail">Email:</label>
          <input id="inputEmail" readonly class="inputEst" type="text" />
        </div>
        <div class="container-inputEst">
          <label for="inputTelf">Teléfono:</label>
          <input id="inputTelf" readonly class="inputEst" type="text" />
        </div>
        
        `;

        const closebtn = document.querySelector("#closeModal");
        closebtn.addEventListener("click", () => {
          modal.classList.add("hidden");
        });

        const estudiante = await buscarEstudiante(id);
        const usuario = await buscarUsuario(id);
        const inputName = document.querySelector("#inputName");
        const inputEmail = document.querySelector("#inputEmail");
        const inputTelf = document.querySelector("#inputTelf");
        inputName.value = estudiante.data.fullName;
        inputEmail.value = usuario.data.email;
        const divDes = document.createElement("div");
        divDes.classList.add("container-inputEst");
        divDes.innerHTML = `
        <label for="inputDesc">Descripción:</label>
        <textarea placeholder="Sea específico explicando los cambios que realizó para que su petición sea aceptada" id="inputDesc" class="inputEst areaEst"></textarea>
        `;
        const btnEditar = document.querySelector("#editar");
        const aceptar = document.createElement("button");
        aceptar.id = "aceptar";
        aceptar.setAttribute("data-id", id);
        aceptar.classList.add("btn-est");
        aceptar.innerHTML = "Aceptar";
        btnEditar.addEventListener("click", () => {
          inputEmail.readOnly = false;
          inputName.readOnly = false;
          inputTelf.readOnly = false;
          containerModal.appendChild(divDes);
          containerModal.appendChild(aceptar);
          const btnAceptar = document.querySelector("#aceptar");
          btnAceptar.addEventListener("click", actEstudiante);
        });
      }
    });
  });
}

async function eventosEst(idSubject) {
  const containerAsig = document.querySelector("#asignaciones");
  containerAsig.addEventListener("click", async (e) => {
    const containerModal = document.querySelector("#container-modal");
    const modal = document.querySelector("#modal");
    if (e.target.parentElement.classList.contains("assigmentS")) {
      const idAsig = e.target.parentElement.id;
      const asig = await buscarAsignacion(idAsig);
      const { name, date, description } = asig.data;
      try {
        const existe = await buscarUnaAsig(id, idAsig);
        if (existe.data) {
          containerModal.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
          <div class="container-nameAsig">
              <p>Nombre:</p>
              <p>${name}</p>
            </div>
            <div class="container-dateAsig">
              <p>Fecha de entrega:</p>
              <p>${date}</p>
            </div>
            <div class="container-descAsig">
              <p>Descripción:</p>
              <p>${description}</p>
            </div>
            <div class="container-download">
            <label class="download-asig">Entregado</label>
            
            </div>

        `;
          modal.classList.remove("hidden");
          const closeModal = document.querySelector("#closeModal");
          return closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
          });
        }
      } catch (error) {
        if (asig.data.path) {
          containerModal.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
          <div class="container-nameAsig">
          <p>Nombre:</p>
          <p>${name}</p>
        </div>
        <div class="container-dateAsig">
          <p>Fecha de entrega:</p>
          <p>${date}</p>
        </div>
        <div class="container-descAsig">
          <p>Descripción:</p>
          <p>${description}</p>
        </div>
        <div class="container-download">
          <a href="../${asig.data.path}" download class="download-asig">Descargar</a>
          <label id="labelEnt" class="download-asig pointer" for="uploadAsig">Entregar</label>
          <form id="saveAsigE">
            <input type="file" name="studentAsig" class="hidden" id="uploadAsig">
            <button class="download-asig hidden" id="aceptar">Aceptar</button>
          </form>
        </div>`;
        } else {
          containerModal.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
          <div class="container-nameAsig">
              <p>Nombre:</p>
              <p>${name}</p>
            </div>
            <div class="container-dateAsig">
              <p>Fecha de entrega:</p>
              <p>${date}</p>
            </div>
            <div class="container-descAsig">
              <p>Descripción:</p>
              <p>${description}</p>
            </div>
            <form class="container-download" id="saveAsigE">
            <label id="labelEnt" class="download-asig pointer" for="uploadAsig">Entregar</label>
          
            <input type="file" name="studentAsig" class="hidden" id="uploadAsig">
            <button class="download-asig hidden" id="aceptar">Aceptar</button>
          
          </form>
            `;
        }
        modal.classList.remove("hidden");
        const closeModal = document.querySelector("#closeModal");
        closeModal.addEventListener("click", () => {
          modal.classList.add("hidden");
        });

        const inputFile = document.querySelector("#uploadAsig");
        inputFile.addEventListener("change", () => {
          aceptar.classList.remove("hidden");
        });
        const saveAsigE = document.querySelector("#saveAsigE");
        saveAsigE.addEventListener("submit", async (e) => {
          e.preventDefault();
          const data = new FormData(saveAsigE);
          try {
            if (!inputFile.value) {
              return crearMsg("Tiene que cargar un archivo antes de enviar");
            }
            const post = await guardarAsignacionEstudiante(
              data,
              idSubject,
              id,
              idAsig
            );
            const act = await guardarAsignacionEst(post.data.id, idAsig);
            crearMsg(act.data.message);
            modal.classList.add("hidden");
          } catch (error) {
            crearMsg(error.response.data.message);
          }
        });
      }
    }
  });
}

function eventosProf(id) {
  const btnAsig = document.querySelector("#asig");
  const btnCalendar = document.querySelector("#calendario");
  const btnEst = document.querySelector("#alumnos");
  btnEst.addEventListener("click", () => {
    if (document.querySelector("#crear")) {
      document.querySelector("#crear").remove();
    }
    const containerAsig = document.querySelector("#asignaciones");
    containerAsig.innerHTML = `
    <div id="asignacion" class="asignacion">
              <p class="column">Nombre</p>
              <div class="container-fecha">
                <div class="separador"></div>
                <p class="container-date blockh">Datos</p>
              </div>
            </div>
    `;
    consultaEst(id);
  });
  btnAsig.addEventListener("click", async () => {
    if (document.querySelector("#crear")) {
      document.querySelector("#crear").remove();
    }
    const titulo = document.querySelector("#titulo");
    titulo.innerHTML = "Asignaciones";
    const containerBtn = document.querySelector(".container-btn");
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="crear" class="btnProf">Crear</button>
    `;
    containerBtn.appendChild(div);
    crearBtn(id);
    const containerAsig = document.querySelector("#asignaciones");
    containerAsig.innerHTML = `
    <div id="asignacion" class="asignacion">
    <p class="column">Nombre</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date blockh">Fecha de entrega</p>
    </div>
  </div>
    `;
    const materia = await buscarMateria(id);
    const listadoAsig = JSON.parse(materia.data.assigmentT);
    listadoAsig.forEach(async (i) => {
      const asignacion = await buscarAsignacion(i);
      const { name, date } = asignacion.data;
      const divA = document.createElement("div");
      const datos = document.querySelector(".blockh");
      datos.innerHTML = "Fecha de entrega";
      divA.id = i;
      divA.classList.add("asignacion", "pointer", "studentAsig");
      divA.innerHTML = `
      <p class="column">${name}</p>
      <div class="container-fecha">
        <div class="separador"></div>
        <p class="container-date blockh">${date}</p>
      </div>
    `;
      containerAsig.appendChild(divA);
    });
    setTimeout(() => {
      cargarAsigEst();
    }, 500);
  });
}

async function eventosStaff() {
  const quarters = document.querySelector("#quarters");
  const requests = document.querySelector("#requests");
  quarters.addEventListener("click", cargarTrimestres);
  requests.addEventListener("click", cargarPeticiones);
}

function closeModalBtn() {
  const closeModal = document.querySelector("#closeModal");
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

// peticiones

async function cargarPeticiones() {
  imprimirPeticiones();
  filtrarReq();
  imprimirRequest();
}

async function filtrarReq() {
  const typeRequest = document.querySelector("#typeRequest");
  typeRequest.addEventListener("change", () => {
    const filtro = typeRequest.value;
    imprimirRequestFilt(filtro);
  });
}

async function imprimirRequestFilt(filter) {
  const containerReq = document.querySelector(".container-request");
  containerReq.innerHTML = "";
  try {
    const listado = await listadoRequestFilt(filter);
    const { data } = listado;
    data.forEach(async (i) => {
      const div = document.createElement("div");
      div.classList.add("request");
      div.setAttribute("data-request", i.type);
      const codigo = Number(i.type);
      if (i.type === "4005") {
        const datos = JSON.parse(i.data);
        div.innerHTML = `
        <span>${datos.nombre}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalPeticiones(e, i.data, i.id, i.idUser);
        });
        return containerReq.appendChild(div);
      }
      const usuario = await buscarUsuario(i.idUser);
      if (i.status === 0) {
        div.innerHTML = `
      <span>${usuario.data.name}</span>
              <span>${objPeticion[codigo]}</span>
              <span>${objStatusPet[i.status]}</span>
      `;
      } else {
        div.innerHTML = `
        <span>${usuario.data.name}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
      }

      div.addEventListener("click", (e) => {
        modalPeticiones(e, i.data, i.id, i.idUser);
      });
      containerReq.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

async function imprimirRequest() {
  const containerReq = document.querySelector(".container-request");
  containerReq.innerHTML = "";
  try {
    const listado = await listadoRequestStaff();
    const { data } = listado;
    data.forEach(async (i) => {
      const div = document.createElement("div");
      div.classList.add("request");
      div.setAttribute("data-request", i.type);
      const codigo = Number(i.type);
      if (i.type === "4005") {
        const datos = JSON.parse(i.data);
        div.innerHTML = `
        <span>${datos.nombre}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalPeticiones(e, i.data, i.id, i.idUser);
        });
        return containerReq.appendChild(div);
      }
      const usuario = await buscarUsuario(i.idUser);
      if (i.status === 0) {
        div.innerHTML = `
      <span>${usuario.data.name}</span>
              <span>${objPeticion[codigo]}</span>
              <span>${objStatusPet[i.status]}</span>
      `;
      } else {
        div.innerHTML = `
        <span>${usuario.data.name}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
      }

      div.addEventListener("click", (e) => {
        modalPeticiones(e, i.data, i.id, i.idUser);
      });
      containerReq.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

async function modalPeticiones(e, data, idReq, idUser) {
  if (e.target.classList.contains("delete-request")) {
    const id = e.target.id;
    try {
      const eliminar = await eliminarReq(id);
      crearMsg(eliminar.data.message);
      return imprimirRequest();
    } catch (error) {
      console.log(error);
    }
  }
  const tipo = e.target.closest("div").dataset.request;
  if (tipo === "4001") {
    const info = JSON.parse(data);
    modal.classList.remove("hidden");
    imprimirCambioDatos(info.description);
    closeModalBtn();
    const aceptar = document.querySelector("#aceptar");
    const rechazar = document.querySelector("#rechazar");
    aceptar.addEventListener("click", () => {
      aceptarPeticion(idReq, info, idUser);
    });
    rechazar.addEventListener("click", () => {
      rechazarPeticion(idReq);
    });
  }
}

async function aceptarPeticion(idReq, info, idUser) {
  try {
    const act = await actAlumno(idUser, info.dataStudent, info.dataUser);
    const actReq = await aceptarReq(idReq);
    crearMsg(actReq.data.message);
    modal.classList.add("hidden");
    imprimirRequest();
  } catch (error) {
    crearMsg(error);
  }
}

async function rechazarPeticion(idReq) {
  try {
    const act = await rechazarReq(idReq);
    crearMsg(act.data.message);
    modal.classList.add("hidden");
    imprimirRequest();
  } catch (error) {
    crearMsg(error.response.data.message);
  }
}

// trimestres

async function cargarTrimestres() {
  imprimirContainerStaff();
  imprimirTrimestres();
  const btnQuarter = document.querySelector(".btnQuarter");
  btnQuarter.addEventListener("click", () => {
    imprimirCrearTrim();
    flatpickr("#startDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    flatpickr("#endDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    flatpickr("#inscDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    flatpickr("#createDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    modal.classList.remove("hidden");
    const closebtn = document.querySelector("#closeModal");
    closebtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
    const aceptarBtn = document.querySelector("#aceptar");
    aceptarBtn.addEventListener("click", async () => {
      const startDate = document.querySelector("#startDate").value;
      const endDate = document.querySelector("#endDate").value;
      const trim = document.querySelector("#selectQuarter").value;
      const fechaIni = startDate.split("-");
      const fechaFin = endDate.split("-");

      if (!startDate || !endDate || !trim) {
        return crearMsg("No puede dejar campos vacíos");
      }
      if (startDate === endDate) {
        return crearMsg("No puede seleccionar las mismas fechas");
      }
      if (
        Number(fechaIni[0]) > Number(fechaFin[0]) &&
        Number(fechaIni[1]) >= Number(fechaFin[1]) &&
        Number(fechaIni[2]) >= Number(fechaFin[2])
      ) {
        return crearMsg("Las fechas son incorrectas");
      }
      try {
        const post = await guardarTrimestre(startDate, endDate, trim);
        crearMsg(post.data.message);
        modal.classList.add("hidden");
        const containerModulos = document.querySelector(".container-modulos");
        containerModulos.innerHTML = "";
        const listado = await listadoTrimestres();
        const { data } = listado;
        data.forEach((i) => {
          const div = document.createElement("div");
          div.classList.add("modulos", "pointer");
          const codigo = Number(i.quarter);
          if (i.status === 2) {
            div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatus[i.status]}</span>
              <button class="delete-quarter" id="${i.id}">Eliminar</button>
        `;
            containerModulos.appendChild(div);
          } else {
            div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatus[i.status]}</span>
        `;
            containerModulos.appendChild(div);
          }
          containerModulos.addEventListener("click", eliminarQuarter);
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
}

async function imprimirTrimestres() {
  const containerModulos = document.querySelector(".container-modulos");
  containerModulos.innerHTML = "";
  try {
    const listado = await listadoTrimestres();
    const { data } = listado;
    data.forEach((i) => {
      const div = document.createElement("div");
      div.classList.add("modulos", "pointer");
      const codigo = Number(i.quarter);
      if (i.status === 2) {
        div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatus[i.status]}</span>
              <button class="delete-quarter" id="${i.id}">Eliminar</button>
        `;
        containerModulos.appendChild(div);
      } else {
        div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatus[i.status]}</span>
        `;
        containerModulos.appendChild(div);
      }
      containerModulos.addEventListener("click", eliminarQuarter);
    });
  } catch (error) {
    console.log(error);
  }
}

async function eliminarQuarter(e) {
  if (e.target.classList.contains("delete-quarter")) {
    const IDquarter = e.target.id;
    try {
      const eliminar = await eliminarTrimestres(IDquarter);
      crearMsg(eliminar.data.message);
      e.target.parentElement.remove();
    } catch (error) {
      console.log(error);
    }
  }
}

async function actEstudiante(e) {
  const id = e.target.getAttribute("data-id");
  const inputDesc = document.querySelector("#inputDesc").value;
  const inputName = document.querySelector("#inputName").value;
  const inputEmail = document.querySelector("#inputEmail").value;
  const inputTelf = document.querySelector("#inputTelf").value;

  try {
    const act = await cambioDatos(
      id,
      {
        fullName: inputName,
        telefono: inputTelf,
      },
      { email: inputEmail },
      { inputDesc }
    );
    crearMsg(act.data.message);
    modal.classList.add("hidden");
  } catch (error) {
    console.log(error);
  }
}

async function cargarEstudiantes() {
  const containerEst = document.querySelector("#estudiantes");
  try {
    const consulta = await buscarRol(4);
    const listado = consulta.data;
    listado.forEach(async (i) => {
      const estudiante = await buscarEstudiante(i.id);
      const user = await buscarUsuario(i.id);
      const est = estudiante.data;
      listadoEst.push(est);
      listadoUser.push(i);
      const div = document.createElement("div");
      div.classList.add("estudiante");
      div.id = i.id;
      div.innerHTML = `
      <div id="${i.id}" class="asignacion pointer"> 
        <p>${est.fullName}</p>
        <p>${user.data.email}</p>
        <p>${i.id}</p>
      </div>
      `;
      containerEst.appendChild(div);
    });
  } catch (error) {
    crearMsg(error.response.data.message);
  }
}

async function impListadoMat(list) {
  const listado = JSON.parse(list);
  listado.map(async (i) => {
    const materia = await buscarMateria(i);
    const li = document.createElement("li");
    li.textContent = materia.data.name;
    li.classList.add("subject");
    li.id = i;
    listadoMaterias.appendChild(li);
  });
}

function printProf() {
  listadoMaterias.addEventListener("click", async (e) => {
    if (e.target.classList.contains("subject")) {
      const id = e.target.id;
      imprimirContainerProf();
      consultaEst(id);
      eventosProf(id);
    }
  });
}

function printEst() {
  const gradesBtn = document.querySelector("#gradesBtn");
  gradesBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    imprimirContainerEst();
    const titulo = document.querySelector("#titulo");
    titulo.innerHTML = "Notas";
    const containerGrades = document.querySelector("#asignaciones");
    containerGrades.innerHTML = `
    <div class="asignacion">
    <div class="container-grades">
      <label for"subjectSel">
        Selecione la materia
      </label>
      <select class="subjectSel" id="subjectSel" name="subjectSel">
          <option> 
            ...
          </option>
      </select>
    </div>
    </div>
    <div id="containerNotas"></div>
    `;

    const subjectSel = document.querySelector("#subjectSel");
    try {
      const estudiante = await buscarEstudiante(id);
      const { subjects } = estudiante.data;
      const listadoMat = JSON.parse(subjects);
      listadoMat.forEach(async (i) => {
        const materia = await buscarMateria(i);
        const option = document.createElement("option");
        option.value = i;
        option.textContent = materia.data.name;
        subjectSel.appendChild(option);
      });
    } catch (error) {}

    subjectSel.addEventListener("change", async () => {
      const idSubject = subjectSel.value;
      const containerNotas = document.querySelector("#containerNotas");
      containerNotas.innerHTML = "";
      try {
        const listadoNotas = await listadoAsigEst(id, idSubject);
        const container = document.querySelector("#asignaciones");
        const { data } = listadoNotas;
        data.forEach(async (i) => {
          if (i.grades) {
            const asignacion = await buscarAsignacion(i.assigmentT);
            const nota = document.createElement("div");
            nota.innerHTML = `
            <div id="asignacion" class="asignacion">
              <p class="column">${asignacion.data.name}</p>
              <div class="container-fecha">
                <div class="separador"></div>
                <p class="container-date">${i.grades}</p>
              </div>
            </div>
            `;
            containerNotas.appendChild(nota);
            container.appendChild(containerNotas);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  listadoMaterias.addEventListener("click", async (e) => {
    if (e.target.classList.contains("subject")) {
      const id = e.target.id;
      imprimirContainerEst();
      cargarAsig(id);
      eventosEst(id);
    }
  });
}

//Asignaciones

async function cargarAsig(id) {
  const materia = await buscarMateria(id);
  const containerM = document.querySelector("#asignaciones");
  const titulo = document.querySelector("#titulo");
  titulo.innerText = "Asignaciones";
  const listadoAsig = JSON.parse(materia.data.assigmentT);
  listadoAsig.forEach(async (i) => {
    const asignacion = await buscarAsignacion(i);
    const { name, date } = asignacion.data;
    const div = document.createElement("div");
    div.classList.add("asignacion", "pointer", "assigmentS");
    div.innerHTML = `
    <p class="column">${name}</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date">${date}</p>
    </div>
  `;
    div.id = i;
    containerM.appendChild(div);
  });
}

async function consultaEst(id) {
  const containerM = document.querySelector("#asignaciones");
  const titulo = document.querySelector("#titulo");
  titulo.innerText = "Alumnos";
  const materia = await buscarMateria(id);
  const listadoEst = JSON.parse(materia.data.students);
  listadoEst.forEach(async (i) => {
    const student = await buscarUsuario(i);
    const namestudent = await buscarEstudiante(i);
    const email = student.data.email;
    const name = namestudent.data.fullName;
    const div = document.createElement("div");
    div.classList.add("asignacion");
    div.innerHTML = `
    <p class="column">${name}</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date">email: ${email}</p>
    </div>
  `;
    containerM.appendChild(div);
  });
}

async function cargarAsigEst() {
  const listadoHtml = document.getElementsByClassName("studentAsig");
  const containerAsig = document.querySelector("#asignaciones");
  for (let i = 0; i < listadoHtml.length; i++) {
    const asig = listadoHtml[i];
    asig.addEventListener("click", async (e) => {
      const id = e.target.closest("div").id;
      containerAsig.innerHTML = `
      <div id="asignacion" class="asignacion">
    <p class="column">Nombre</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date blockh"></p>
    </div>
  </div>`;
      const listado = await listadoAsignaciones(id);
      const { data } = listado;
      data.forEach(async (i) => {
        const { id, user, path } = i;

        const estudiante = await buscarEstudiante(user);
        const { fullName } = estudiante.data;
        const divA = document.createElement("div");
        divA.classList.add("asignacion", "studentAsig");
        if (i.grades) {
          divA.innerHTML = `
          <p class="column">${fullName}</p>
          <div class="container-fecha">
            <div class="separador"></div>
            <div class="container-corregir">
            <a download href="../${path}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="download-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
            <button data-id="${id}" id="${path}" class="eliminar-asig">Eliminar</button>
            </div>
              
            </div>
        `;
          containerAsig.appendChild(divA);
        } else {
          divA.innerHTML = `
          <p class="column">${fullName}</p>
          <div class="container-fecha">
            <div class="separador"></div>
              <div class="container-corregir">
              <a download href="../${path}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="download-svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>
              <button data-id="${id}" class="corregir" id="corregir">Corregir</button>
              <button data-id="${id}" id="${path}" class="eliminar-asig">Eliminar</button>
              </div>
            </div>
        `;
          containerAsig.appendChild(divA);
        }
      });
      setTimeout(() => {
        eliminarAsignacion();
        corregirAsignacion();
      }, 500);
    });
  }
}

async function eliminarAsignacion() {
  const eliminar = document.getElementsByClassName("eliminar-asig");
  for (let i = 0; i < eliminar.length; i++) {
    const btnDel = eliminar[i];
    btnDel.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const path = e.target.id;
      const confirmar = confirm(
        "Está seguro de que quiere eliminar esta asignación?"
      );
      if (confirmar) {
        try {
          const eliminar = await eliminarAsig(id, path);
          const act = await actAsigT(id, eliminar.data.idAsigT);
          crearMsg(act.data.message);
          e.target.parentElement.parentElement.parentElement.remove();
        } catch (error) {
          crearMsg(error.response.data.message);
        }
      }
    });
  }
}

async function corregirAsignacion() {
  const corregir = document.getElementsByClassName("corregir");

  for (let i = 0; i < corregir.length; i++) {
    const btn = corregir[i];
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      modal.classList.remove("hidden");
      containerModal.innerHTML = `
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      <div class="container-grade">
          <label for="gradeInput"> Introduzca la nota </label>
          <input type="text" class="grade-input" id="gradeInput" />
        </div>
        <button class="download-asig" id="aceptar">
          Aceptar
        </button>
      `;
      const closebtn = document.querySelector("#closeModal");
      closebtn.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
      const gradeInput = document.querySelector("#gradeInput");
      const aceptar = document.querySelector("#aceptar");
      aceptar.addEventListener("click", async (e) => {
        const nota = Number(gradeInput.value);
        if (nota == "") return crearMsg("No puede dejar el campo vacío");
        if (nota > 100) return crearMsg("No puede poner una nota mayor a 100");
        if (nota < 0) return crearMsg("No puede poner una nota menor a 0");
        if (isNaN(nota)) return crearMsg("No puede poner texto como nota");
        try {
          const act = await corregirAsig(id, gradeInput.value);
          btn.remove();
          crearMsg(act.data.message);
          modal.classList.add("hidden");
        } catch (error) {
          crearMsg(error.response.data.message);
        }
      });
    });
  }
}

async function crearBtn(idSubject) {
  const crea = document.querySelector("#crear");
  crea.addEventListener("click", async () => {
    modal.classList.toggle("hidden");
    imprimirCrearAsig();

    const closeModal = document.querySelector("#closeModal");
    flatpickr("#dateAsig", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    closeModal.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
    guardarDatos(idSubject);
  });
}

async function guardarDatos(idSubject) {
  const formulario = document.querySelector("#formulario");
  const aceptar = document.querySelector("#aceptar");
  aceptar.addEventListener("click", async (e) => {
    e.preventDefault();
    const fecha = document.querySelector("#dateAsig").value;
    const name = document.querySelector("#nameAsig").value;
    const desc = document.querySelector("#descAsig").value;
    const listaInput = [fecha, name, desc].some((i) => i === "");

    if (listaInput) {
      return crearMsg("No puede dejar los campos vacíos");
    }

    const data = new FormData(formulario);
    try {
      const post = await guardarAsignacion(data, id, idSubject);
      const act = await guardarAsignacionMat(post.data.id, idSubject);
      modal.classList.add("hidden");
      crearMsg(act.data.message);
    } catch (error) {
      crearMsg(error.response.data.message);
    }
  });
}

//Notas
