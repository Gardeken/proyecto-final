import {
  aceptarPay,
  actualizarDeuda,
  agregarDeuda,
  buscarDeuda,
  buscarDeudas,
} from "./apis/APIpayment.js";
import {
  buscarEstudiante,
  actAlumno,
  aceptarAlumno,
  eliminarEstudiante,
  actualizarMatEst,
  agregarSubStudent,
} from "./apis/APIstudent.js";
import {
  buscarInfoMateria,
  buscarRequerimientos,
} from "./apis/APIinfoSubject.js";
import { actMatProf, buscarProfesor } from "./apis/APIteachers.js";
import {
  buscarMateria,
  guardarAsignacionMat,
  createSubject,
  actualizarMateria,
  listAgregarMaterias,
  actualizarSubject,
  listAgregarMateriasFilt,
  actContador,
  actStatusMat,
} from "./apis/APIsubject.js";
import { buscarUsuario, buscarRol, crearUser } from "./apis/APIuser.js";
import {
  cambioDatos,
  crearSubject,
  procesarPago,
  listadoRequestStaff,
  listadoRequestAdmin,
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
  validarCreate,
  validarInsc,
  buscarTrimestre,
  agregarMatTrim,
} from "./apis/APIquarter.js";
import {
  buscarAsignacion,
  guardarAsignacion,
  guardarAsignacionEst,
  actAsigT,
  eliminarAsignacionT,
  listadoAsigT,
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
import { buscarCarrerasFac } from "./apis/APIinfoCareer.js";

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
const objStatusModulo = {
  0: "Inactivo",
  1: "Activo",
  2: "Pre-activo",
  3: "Pendiente",
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

const objFacultad = {
  3001: "Facultad de Diseño",
  3002: "Falcultad de Administración",
  3003: "Facultad de Derecho",
  3004: "Facultad de ingienería",
  3005: "Facultad de educación",
};

const objCarreras = {
  2000: "Diseño gráfico",
  2001: "Arquitectura",
  2002: "Diseño Industrial",
  2003: "Administración mención ciencias administrativas",
  2004: "Contaduría pública",
  2005: "Administración Pública",
  2006: "Derecho",
  2007: "Educación Preescolar",
  2008: "Educación integral",
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
  cambiarTrimestre();
  cargarNombre();
  const user = localStorage.getItem("user");
  if (user === null) {
    window.location.href = "/login";
  }

  const obj = {
    1: "staff",
    2: "admin",
    3: "teacher",
    4: "student",
  };

  const usuario = await buscarUsuario(id);
  const rolUser = usuario.data.rol;

  if (obj[rolUser] !== rol) {
    window.location.href = "/login";
    localStorage.removeItem("user");
  }

  if (rol === "student") {
    const usuario = await buscarEstudiante(id);
    printEst();
    return impListadoMat(usuario.data.subjects);
  }
  if (rol === "teacher") {
    const prof = await buscarProfesor(id);
    printProf();
    const createSub = document.querySelector("#createSub");
    createSub.addEventListener("click", async () => {
      try {
        const validacion = await validarCreate();
        crearMateria(validacion.data.IDquarter);
      } catch (error) {
        return imprimir404("Crear materia", "Aún no es fecha de creación");
      }
    });

    return impListadoMat(prof.data.subjects);
  }
  if (rol === "admin") {
    return eventosAdmin();
  }
  if (rol === "staff") {
    return eventosStaff();
  }
});

async function cambiarTrimestre() {
  const update = await actualizarTrimestres();
  if (update.data.cambio) {
    let { subjects3, subjects6, subjects6Act, idQuarter } = update.data;
    subjects3 = JSON.parse(subjects3);
    subjects6 = JSON.parse(subjects6);
    subjects6Act = JSON.parse(subjects6Act);
    subjects3.forEach(async (subject) => {
      try {
        await actStatusMat(subject, 1);
      } catch (error) {
        console.log(error);
      }
    });
    subjects6.forEach(async (subject) => {
      try {
        await actStatusMat(subject, 1);
      } catch (error) {
        console.log(errror);
      }
    });
    subjects6Act.forEach(async (subject) => {
      const materia = await buscarMateria(subject);
      const { quarterCount } = materia.data;
      if (quarterCount + 1 < 3) {
        try {
          const act = await actContador(subject);
          const agregar = await agregarMatTrim(6, subject, idQuarter);
        } catch (error) {
          console.log(error);
        }
      } else if (quarterCount + 1 >= 3) {
        try {
          const act = await actStatusMat(subject, 0);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}

async function crearMateria(IDquarter) {
  imprimirCrearMatProf();
  const formCreate = document.querySelector("#formCreate");
  const inputPensum = document.querySelector("#filePensum");
  const delPensum = document.querySelector("#delPensum");
  const endClass = document.querySelector("#endClass");
  const startClass = document.querySelector("#startClass");
  const selectSubject = document.querySelector("#selectSubject");
  const selectCareer = document.querySelector("#selectCareer");
  const selectFac = document.querySelector("#selectFac");
  eventoVal(inputPensum);
  deleteFile(delPensum, inputPensum);

  selectFac.addEventListener("change", () => {
    cargarCarreras(selectFac.value);
    cargarMaterias({ CODFaculty: selectFac.value });
  });
  selectCareer.addEventListener("change", () => {
    if (selectCareer.value === "") {
      return cargarMaterias({ CODFaculty: selectFac.value });
    }
    cargarMaterias({ CODCareer: selectCareer.value });
  });

  formCreate.addEventListener("submit", async (e) => {
    e.preventDefault();
    const listadoInputs = [
      inputPensum,
      endClass,
      startClass,
      selectSubject,
      selectFac,
    ].some((i) => i.value === "");
    if (listadoInputs) {
      return crearMsg("No puede dejar los campos vacíos");
    }
    const data = new FormData(formCreate);
    let contador = 0;
    const validacion = data.forEach((i) => {
      if (i === "1") {
        contador += 1;
      }
    });
    if (contador === 0) {
      return crearMsg("Tiene que selecionar un día");
    }
    try {
      const crear = await crearSubject(data, id, IDquarter);
      crearMsg(crear.data.message);
      formCreate.reset();
    } catch (error) {
      console.log(error);
    }
  });
}

async function cargarNombre() {
  const usuario = await buscarUsuario(id);
  const userName = document.querySelector("#userName");
  const idContainer = document.querySelector("#idContainer");
  const { name } = usuario.data;
  userName.innerHTML = name;
  idContainer.innerHTML = `ID: ${usuario.data.id}`;
}

// crear materias

async function cargarCarreras(facultad) {
  const listadoCarreras = await buscarCarrerasFac(facultad);
  const selectCareer = document.querySelector("#selectCareer");
  const { data } = listadoCarreras;
  selectCareer.innerHTML = `
  <option value="">...</option>
  `;
  data.forEach((i) => {
    const option = document.createElement("option");
    option.value = i.CODCareer;
    option.textContent = i.name;
    selectCareer.appendChild(option);
  });
}
async function cargarMaterias(filtro) {
  const listado = await buscarInfoMateria(filtro);
  const selectSubject = document.querySelector("#selectSubject");
  const { data } = listado;
  selectSubject.innerHTML = `
  <option selected disabled value="">...</option>
  `;
  data.forEach((i) => {
    const option = document.createElement("option");
    option.value = i.CODSubject;
    option.textContent = i.name;
    selectSubject.appendChild(option);
  });
}

//eventos

async function eventosAdmin() {
  const searchSt = document.querySelector("#searchSt");
  const requests = document.querySelector("#requests");
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

  requests.addEventListener("click", async () => {
    imprimirPeticionesAdmin();
    filtrarReqAdmin();
    imprimirRequestAdmin();
  });
}

async function imprimirRequestAdmin() {
  const containerReq = document.querySelector(".container-request");
  containerReq.innerHTML = "";
  try {
    const listado = await listadoRequestAdmin();
    const { data } = listado;
    data.forEach(async (i) => {
      const div = document.createElement("div");
      div.classList.add("request");
      div.setAttribute("data-request", i.type);
      const codigo = Number(i.type);
      if (i.type === "4005") {
        const datos = JSON.parse(i.data);
        div.innerHTML = `
        <span class="column2" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
        ${datos.nombre}
        </span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalPeticiones(e, i.data, i.id, i.idUser, i.status);
        });
        return containerReq.appendChild(div);
      }
      const usuario = await buscarUsuario(i.idUser);
      if (i.status === 0) {
        div.innerHTML = `
      <span class="column2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
      ${usuario.data.name}
      </span>
              <span>${objPeticion[codigo]}</span>
              <span>${objStatusPet[i.status]}</span>
      `;
      } else {
        div.innerHTML = `
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
        ${usuario.data.name}
        </span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
      }

      div.addEventListener("click", (e) => {
        modalPeticiones(e, i.data, i.id, i.idUser, i.status);
      });
      containerReq.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

function eventosProf(idSubject) {
  const btnAsig = document.querySelector("#asig");
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
    consultaEst(idSubject);
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
    crearBtn(idSubject);
    const containerAsig = document.querySelector("#asignaciones");
    containerAsig.innerHTML = `
    <div id="asignacion" class="asignacion  studentAsig">
    <p class="column">Nombre</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date">Fecha de entrega</p>
    </div>
  </div>
    `;
    const materia = await buscarMateria(idSubject);
    const listadoAsig = JSON.parse(materia.data.assigmentT);
    listadoAsig.forEach(async (i) => {
      const asignacion = await buscarAsignacion(i);
      if (!asignacion.data) {
        return;
      }
      const { name, date, id, assigmentE, porcentaje } = asignacion.data;
      const divA = document.createElement("div");
      divA.id = i;
      divA.classList.add("asignacion", "pointer", "studentAsig");
      if (assigmentE === undefined || JSON.parse(assigmentE).length === 0) {
        divA.innerHTML = `
      <p class="column">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
      ${name}</p>
      <div class="container-fecha">
        <div class="separador"></div>
        <p class="container-date">${date}</p>
      </div>
      <p>${porcentaje}%</p>
      <button data-id="${id}" id="delete" class="delete-asig">Eliminar</button>
    `;
      } else {
        divA.innerHTML = `
      <p class="column">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>${name}</p>
      <p>${porcentaje}%</p>
      <div class="container-fecha">
        <div class="separador"></div>
        <p class="container-date">${date}</p>
      </div>
    `;
      }
      containerAsig.appendChild(divA);
      divA.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-asig")) {
          return eliminarAsigT(e, idSubject);
        }
        const idAsigT = e.target.closest("div").id;
        containerAsig.innerHTML = `
      <div id="asignacion" class="asignacion">
    <p class="column">Nombre</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date blockh"></p>
    </div>
  </div>
        `;
        const listado = await listadoAsignaciones(idAsigT);
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
            divA.addEventListener("click", async (e) => {
              if (e.target.classList.contains("eliminar-asig")) {
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
              }
            });
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
            divA.addEventListener("click", async (e) => {
              if (e.target.classList.contains("eliminar-asig")) {
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
              } else if (e.target.classList.contains("corregir")) {
                const btn = e.target;
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
                closeModalBtn();
                const gradeInput = document.querySelector("#gradeInput");
                const aceptar = document.querySelector("#aceptar");
                aceptar.addEventListener("click", async (e) => {
                  const nota = Number(gradeInput.value);
                  if (nota == "")
                    return crearMsg("No puede dejar el campo vacío");
                  if (nota > 100)
                    return crearMsg("No puede poner una nota mayor a 100");
                  if (nota < 0)
                    return crearMsg("No puede poner una nota menor a 0");
                  if (isNaN(nota))
                    return crearMsg("No puede poner texto como nota");
                  try {
                    const usuario = await buscarUsuario(i.user);
                    const act = await corregirAsig(
                      id,
                      gradeInput.value,
                      usuario.data.email
                    );
                    const materia = await buscarMateria(idSubject);
                    if (materia.data.porcentaje > 55) {
                      const listadoAsig = await listadoAsigEst(user, idSubject);
                      const { data } = listadoAsig;
                      let total = 0;
                      data.forEach((i) => {
                        if (i.grades) {
                          const transformar = (i.grades * i.porcentaje) / 100;
                          total += transformar;
                        }
                      });
                      if (total > 50) {
                        const act = await actualizarMatEst(
                          user,
                          materia.data.CODSubject
                        );
                      }
                    }
                    btn.remove();
                    crearMsg(act.data.message);
                    modal.classList.add("hidden");
                  } catch (error) {
                    console.log(error);
                  }
                });
              }
            });
            containerAsig.appendChild(divA);
          }
        });
      });
    });
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

async function filtrarReqAdmin() {
  const typeRequest = document.querySelector("#typeRequest");
  typeRequest.addEventListener("change", () => {
    const filtro = typeRequest.value;
    if (!filtro) {
      imprimirRequestAdmin();
    }
    imprimirRequestFilt(filtro);
  });
}

async function filtrarReq() {
  const typeRequest = document.querySelector("#typeRequest");
  typeRequest.addEventListener("change", () => {
    const filtro = typeRequest.value;
    if (!filtro) {
      imprimirRequest();
    }
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
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
${datos.nombre}
</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalPeticiones(e, i.data, i.id, i.idUser, i.status);
        });
        return containerReq.appendChild(div);
      }
      if (i.type === "4002") {
        const estudiante = await buscarEstudiante(i.idUser);
        if (i.status === 0) {
          div.innerHTML = `
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>${estudiante.data.fullName}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        `;
          div.addEventListener("click", (e) => {
            modalAplicaciones(e, i.id, estudiante.data, i.status);
          });
          return containerReq.appendChild(div);
        }
        div.innerHTML = `
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
        ${estudiante.data.fullName}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalAplicaciones(e, i.id, estudiante.data, i.status);
        });
        return containerReq.appendChild(div);
      }
      const usuario = await buscarUsuario(i.idUser);
      if (i.status === 0) {
        div.innerHTML = `
      <span class="column2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
${usuario.data.name}</span>
              <span>${objPeticion[codigo]}</span>
              <span>${objStatusPet[i.status]}</span>
      `;
      } else {
        div.innerHTML = `
        <span class="column2">
        ${usuario.data.name}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
      }

      div.addEventListener("click", (e) => {
        modalPeticiones(e, i.data, i.id, i.idUser, i.status);
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
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
        ${datos.nombre}
        </span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalPeticiones(e, i.data, i.id, i.idUser, i.status);
        });
        return containerReq.appendChild(div);
      }
      if (i.type === "4002") {
        const estudiante = await buscarEstudiante(i.idUser);
        if (i.status === 0) {
          div.innerHTML = `
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
        ${estudiante.data.fullName}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        `;
          div.addEventListener("click", (e) => {
            modalAplicaciones(e, i.id, estudiante.data, i.status);
          });
          return containerReq.appendChild(div);
        }
        div.innerHTML = `
        <span class="column2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
        ${estudiante.data.fullName}</span>
                <span>${objPeticion[codigo]}</span>
                <span>${objStatusPet[i.status]}</span>
        <button id="${i.id}" class="delete-request">Eliminar</button>
        `;
        div.addEventListener("click", (e) => {
          modalAplicaciones(e, i.id, estudiante.data, i.status);
        });
        return containerReq.appendChild(div);
      }
      const usuario = await buscarUsuario(i.idUser);
      if (i.status === 0) {
        div.innerHTML = `
      <span class="column2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
      ${usuario.data.name}</span>
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
        modalPeticiones(e, i.data, i.id, i.idUser, i.status);
      });
      containerReq.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

async function modalPeticiones(e, data, idReq, idUser, status) {
  const tipo = e.target.closest("div").dataset.request;
  if (e.target.classList.contains("delete-request")) {
    const id = e.target.id;
    try {
      const eliminar = await eliminarReq(idReq, data);
      crearMsg(eliminar.data.message);
      if (tipo === "4004" || tipo === "4002") {
        return imprimirRequestAdmin();
      } else {
        imprimirRequest();
      }
    } catch (error) {
      console.log(error);
    }
  }
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
  if (tipo === "4003") {
    const datos = JSON.parse(data);
    let dias = "";
    if (datos.lunes) {
      dias += "Lunes ";
    }
    if (datos.martes) {
      dias += "Martes ";
    }
    if (datos.miercoles) {
      dias += "Miércoles ";
    }
    if (datos.jueves) {
      dias += "Jueves ";
    }
    if (datos.viernes) {
      dias += "Viernes ";
    }
    if (datos.sabado) {
      dias += "Sábado ";
    }
    const prof = await buscarUsuario(idUser);
    const materia = await buscarInfoMateria({
      CODSubject: datos.selectSubject,
    });
    if (datos.selectCareer !== "") {
      imprimirCrearMat(
        prof.data.name,
        objFacultad[Number(datos.selectFac)],
        objCarreras[Number(datos.selectCareer)],
        materia.data[0].name,
        dias,
        datos.startClass,
        datos.endClass,
        datos.path
      );
    } else {
      imprimirCrearMat(
        prof.data.name,
        objFacultad[Number(datos.selectFac)],
        "",
        materia.data[0].name,
        dias,
        datos.startClass,
        datos.endClass,
        datos.path
      );
    }
    const aceptar = document.querySelector("#aceptar");
    const rechazar = document.querySelector("#rechazar");
    aceptar.addEventListener("click", () => {
      if (status === 0) {
        return crearMsg("Usted ya acepto esta petición");
      }
      aceptarCrearMat(datos, idUser, materia.data[0], dias, idReq);
    });
    rechazar.addEventListener("click", () => {
      if (status === 0) {
        return crearMsg("Usted ya acepto esta petición");
      }
      rechazarPeticion(idReq);
    });
    modal.classList.remove("hidden");
    closeModalBtn();
  }
  if (tipo === "4004") {
    const datos = JSON.parse(data);
    const usuario = await buscarUsuario(idUser);
    imprimirProcePago(
      usuario.data.name,
      datos.payMount,
      datos.payNumber,
      datos.payDate,
      datos.path
    );
    modal.classList.remove("hidden");
    closeModalBtn();
    const aceptar = document.querySelector("#aceptar");
    const rechazar = document.querySelector("#rechazar");
    aceptar.addEventListener("click", () => {
      if (status === 0) {
        return crearMsg("Usted ya acepto esta petición");
      }
      aceptarPago(idUser, datos, idReq);
    });
    rechazar.addEventListener("click", () => {
      if (status === 0) {
        return crearMsg("Usted ya acepto esta petición");
      }
      rechazarPeticion(idReq);
    });
  }
  if (tipo === "4005") {
    const datos = JSON.parse(data);
    modal.classList.remove("hidden");
    imprimirContactar(datos.nombre, datos.email, datos.telefono, datos.mensaje);
    closeModalBtn();
  }
}

async function aceptarPago(idUser, datos, idReq) {
  try {
    const user = await buscarUsuario(idUser);
    const bcv = await axios.get(
      "https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv"
    );
    const pago = datos.payMount / bcv.data.price;
    const act = await aceptarPay(
      user.data.email,
      idUser,
      pago,
      datos.idQuarter
    );
    const aceptar = await aceptarReq(idReq);
    crearMsg(act.data.message);
    modal.classList.add("hidden");
  } catch (error) {
    console.log(error);
  }
}

async function aceptarCrearMat(data, idUser, materia, dias, idReq) {
  try {
    const prof = await buscarUsuario(idUser);
    const crear = await createSubject(data, idUser, materia, dias);
    const act = await actMatProf(idUser, crear.data.idSubject, prof.data.email);
    modal.classList.add("hidden");
    const aceptar = await aceptarReq(idReq);
    crearMsg(crear.data.message);
  } catch (error) {
    console.log(error);
  }
}

async function modalAplicaciones(e, idReq, student, status) {
  imprimirAplicar(student);
  if (e.target.classList.contains("delete-request")) {
    try {
      const deleteEst = await eliminarEstudiante(student);
      const deletePet = await eliminarReq(idReq);
      return crearMsg(deletePet.data.message);
    } catch (error) {
      return crearMsg(error.response.data.message);
    }
  }
  modal.classList.remove("hidden");
  closeModalBtn();

  const aceptar = document.querySelector("#aceptar");
  const rechazar = document.querySelector("#rechazar");
  aceptar.addEventListener("click", (e) => {
    if (status === 0) {
      return crearMsg("Usted ya acepto esta petición");
    }
    aceptarAplicación(student.fullName, student.email, student.id, idReq);
  });
  rechazar.addEventListener("click", () => {
    if (status === 0) {
      return crearMsg("Usted ya acepto esta petición");
    }
    rechazarPeticion(idReq);
  });
}

async function aceptarAplicación(name, email, idStudent, idReq) {
  imprimirCrearUsuModal();
  closeModalBtn();
  const createBtn = document.querySelector(".createBtn");
  const createUser = document.querySelector("#createUser");
  const passwordUser = document.querySelector("#passwordUser");
  createBtn.addEventListener("click", async () => {
    if (!createUser.value || !passwordUser.value) {
      return crearMsg("No puede dejar los campos vacíos");
    }
    try {
      const crear = await crearUser(
        createUser.value,
        passwordUser.value,
        email,
        name,
        idStudent
      );
      const aceptar = await aceptarReq(idReq);
      const act = await aceptarAlumno(idStudent);
      crearMsg(act.data.message);
      modal.classList.add("hidden");
      imprimirRequest();
    } catch (error) {
      crearMsg(error.response.data.message);
    }
  });
}

async function aceptarPeticion(idReq, info, idUser) {
  try {
    const usuario = await buscarUsuario(idUser);
    const act = await actAlumno(
      idUser,
      info.dataStudent,
      info.dataUser,
      usuario.data.email
    );
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
    flatpickr("#startinscDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    flatpickr("#endinscDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    flatpickr("#startcreateDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    flatpickr("#endcreateDate", {
      minDate: "today",
      dateFormat: "d-m-Y",
    });
    modal.classList.remove("hidden");
    closeModalBtn();
    const aceptarBtn = document.querySelector("#aceptar");
    aceptarBtn.addEventListener("click", async () => {
      const startDate = document.querySelector("#startDate").value;
      const endDate = document.querySelector("#endDate").value;
      const trim = document.querySelector("#selectQuarter").value;
      const inscDate = document.querySelector("#startinscDate").value;
      const endinscDate = document.querySelector("#endinscDate").value;
      const createDate = document.querySelector("#startcreateDate").value;
      const endcreateDate = document.querySelector("#endcreateDate").value;
      const fechaIni = startDate.split("-");
      const fechaFin = endDate.split("-");
      if (
        !startDate ||
        !endDate ||
        !trim ||
        !inscDate ||
        !createDate ||
        !endinscDate ||
        !endcreateDate
      ) {
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
        const post = await guardarTrimestre(
          startDate,
          endDate,
          trim,
          inscDate,
          createDate,
          endinscDate,
          endcreateDate
        );
        crearMsg(post.data.message);
        modal.classList.add("hidden");
        const containerModulos = document.querySelector(".container-modulos");
        containerModulos.innerHTML = "";
        const listado = await listadoTrimestres();
        const { data } = listado;
        data.forEach((i) => {
          const div = document.createElement("div");
          div.classList.add("modulos");
          const codigo = Number(i.quarter);
          if (i.status === 3) {
            div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatusModulo[i.status]}</span>
              <button class="delete-quarter" id="${i.id}">Eliminar</button>
        `;
            containerModulos.appendChild(div);
          } else {
            div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatusModulo[i.status]}</span>
        `;
            containerModulos.appendChild(div);
          }
          containerModulos.addEventListener("click", eliminarQuarter);
        });
      } catch (error) {
        crearMsg(error.response.data.message);
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
      div.classList.add("modulos");
      const codigo = Number(i.quarter);
      if (i.status === 3) {
        div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatusModulo[i.status]}</span>
              <button class="delete-quarter" id="${i.id}">Eliminar</button>
        `;
        containerModulos.appendChild(div);
      } else {
        div.innerHTML = `
        <span>${objModulo[codigo]}</span>
              <span>Inicio: ${i.startDate}</span>
              <span>Fin: ${i.endDate}</span>
              <span>${objStatusModulo[i.status]}</span>
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

// containers

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
    if (materia.data.status !== 1) {
      return;
    }
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
        if (materia.data.status !== 1) {
          return;
        }
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
        if (data.length === 0) {
          const div = document.createElement("div");
          div.innerHTML = "No hay notas para esta materia";
          div.classList.add("aviso");
          containerNotas.appendChild(div);
        }
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

  const agregarMat = document.querySelector("#agregarMat");

  agregarMat.addEventListener("click", async () => {
    imprimirAgregarMat();
    const selectCareer = document.querySelector("#selectCareer");
    const idStudent = URL.get("id");
    const estudiante = await buscarEstudiante(idStudent);
    const listado = await buscarCarrerasFac(estudiante.data.facultad);
    const { data } = listado;
    data.forEach((i) => {
      const option = document.createElement("option");
      option.value = i.CODCareer;
      option.innerHTML = `${i.name}`;
      selectCareer.appendChild(option);
    });
    const containerSub = document.querySelector(".container-subjects");
    try {
      const validar = await validarInsc();
      console.log(validar);
      try {
        selectCareer.addEventListener("change", async () => {
          if (selectCareer.value !== "") {
            containerSub.innerHTML = "";
            const listadoFilt = await listAgregarMateriasFilt(
              3,
              selectCareer.value
            );
            const { data } = listadoFilt;
            data.forEach(async (i) => {
              if (i.cupos === 0) {
                return;
              }
              const div = document.createElement("div");
              const usuario = await buscarUsuario(i.teacher);
              const { name } = usuario.data;
              div.classList.add("subjects");
              const fechas = JSON.parse(i.dates);
              div.innerHTML = `
          <span class="textSub">${i.name}</span>
          <span>${fechas.days} </span>
          <span>${fechas.startClass} - ${fechas.endClass}</span>
          <span>Cupos: ${i.cupos}/30</span>
          <span>${name}</span>
          `;
              const btn = document.createElement("button");
              btn.innerHTML = "Agregar";
              btn.id = i.id;
              btn.classList.add("btnAgregar");
              btn.addEventListener("click", (e) => {
                agregarMatEst(e, validar.data.IDquarter);
              });
              div.appendChild(btn);
              containerSub.appendChild(div);
            });
          } else {
            containerSub.innerHTML = "";
            const listado = await listAgregarMaterias();
            const { data } = listado;
            data.forEach(async (i) => {
              if (i.cupos === 0) {
                return;
              }
              const div = document.createElement("div");
              const usuario = await buscarUsuario(i.teacher);
              const { name } = usuario.data;
              div.classList.add("subjects");
              const fechas = JSON.parse(i.dates);
              div.innerHTML = `
              <span class="textSub">${i.name}</span>
              <span>${fechas.days} </span>
              <span>${fechas.startClass} - ${fechas.endClass}</span>
              <span>Cupos: ${i.cupos}/30</span>
              <span>${name}</span>
              `;
              const btn = document.createElement("button");
              btn.innerHTML = "Agregar";
              btn.id = i.id;
              btn.classList.add("btnAgregar");
              btn.addEventListener("click", (e) => {
                agregarMatEst(e, validar.data.IDquarter);
              });
              div.appendChild(btn);
              containerSub.appendChild(div);
            });
          }
        });

        containerSub.innerHTML = "";
        const listado = await listAgregarMaterias();
        const { data } = listado;
        data.forEach(async (i) => {
          if (i.cupos === 0) {
            return;
          }
          const div = document.createElement("div");
          const usuario = await buscarUsuario(i.teacher);
          const { name } = usuario.data;
          div.classList.add("subjects");
          const fechas = JSON.parse(i.dates);
          div.innerHTML = `
          <span class="textSub">${i.name}</span>
          <span>${fechas.days} </span>
          <span>${fechas.startClass} - ${fechas.endClass}</span>
          <span>Cupos: ${i.cupos}/30</span>
          <span>${name}</span>
          `;
          const btn = document.createElement("button");
          btn.innerHTML = "Agregar";
          btn.id = i.id;
          btn.classList.add("btnAgregar");
          btn.addEventListener("click", (e) => {
            agregarMatEst(e, validar.data.IDquarter);
          });
          div.appendChild(btn);
          containerSub.appendChild(div);
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      containerSub.innerHTML = `
      <span style="width: 100%; display: grid; place-items: center;margin: 1rem"
      >Aún no son fechas de inscripción</span
    >
      `;
    }
  });

  const paysBtn = document.querySelector("#paysBtn");

  paysBtn.addEventListener("click", () => {
    eventoPagos();
  });

  const calendar = document.querySelector("#calendar");

  calendar.addEventListener("click", () => {
    eventoCalendario();
  });

  listadoMaterias.addEventListener("click", async (e) => {
    if (e.target.classList.contains("subject")) {
      const id = e.target.id;
      imprimirContainerEst();
      cargarAsig(id);
    }
  });
}

async function agregarMatEst(e, idQuarter) {
  const idSubject = e.target.id;
  const idUser = URL.get("id");
  const materia = await buscarMateria(idSubject);
  if (materia.data.students) {
    const { students } = materia.data;
    const listadoS = JSON.parse(students);
    const idUser = URL.get("id");
    const agrego = listadoS.some((i) => i === idUser);
    if (agrego) {
      return crearMsg("Usted ya agregó esta materia");
    }
  }
  const info = await buscarRequerimientos(materia.data.CODSubject);
  if (info.data.requirements) {
    const requerimientos = JSON.parse(info.data.requirements);
    const estudiante = await buscarEstudiante(idUser);
    if (estudiante.data.listSubjects) {
      const listadoM = JSON.parse(estudiante.data.listSubjects);
      const tieneRequisito = requerimientos.every((i) => listadoM.includes(i));
      if (tieneRequisito) {
        agregar(idSubject, idUser, idQuarter);
      } else {
        crearMsg("Usted no puede agregar esta materia");
      }
    } else {
      crearMsg("Usted no puede agregar esta materia");
    }
  } else {
    agregar(idUser, idSubject, idQuarter);
  }
}

async function agregar(idUser, idSubject, idQuarter) {
  const confirmar = confirm("Está seguro de que quiere agregar esta materia");
  if (confirmar) {
    const consultar = await buscarDeuda(idUser, idQuarter);
    try {
      const act = await actualizarSubject(idUser, idSubject);
      const agregarS = await agregarSubStudent(idUser, idSubject);
      if (consultar.data.length > 0) {
        const actualizar = await actualizarDeuda(
          idUser,
          idQuarter,
          act.data.deuda,
          act.data.CODSubject
        );
        crearMsg("La materia se ha agregado con éxito");
      } else {
        const crear = await agregarDeuda(
          idUser,
          idQuarter,
          act.data.deuda,
          act.data.CODSubject
        );
        crearMsg("La materia se ha agregado con éxito");
      }
    } catch (error) {
      crearMsg(error.response.data.message);
    }
  }
}

//Calendario

async function eventoCalendario() {
  imprimirCal();
  const containerCal = document.querySelector(".container-calendario");
  const idUser = URL.get("id");
  const estudiante = await buscarEstudiante(idUser);
  const { subjects } = estudiante.data;
  const listadoS = JSON.parse(subjects);
  listadoS.forEach(async (i) => {
    const materia = await buscarMateria(i);
    const { dates } = materia.data;
    const fechas = JSON.parse(dates);
    const div = document.createElement("div");
    div.classList.add("fecha");
    div.innerHTML = `
    <span>${materia.data.name}</span>
    <span>${fechas.days}</span>
    <span>${fechas.startClass} - ${fechas.endClass}</span>
    `;
    containerCal.appendChild(div);
  });
}

//Asignaciones

async function cargarAsig(id) {
  const idSubject = id;
  const materia = await buscarMateria(id);
  const containerM = document.querySelector("#asignaciones");
  const titulo = document.querySelector("#titulo");
  titulo.innerText = "Asignaciones";
  const listadoAsig = JSON.parse(materia.data.assigmentT);
  listadoAsig.forEach(async (i) => {
    const asignacion = await buscarAsignacion(i);
    const { name, date, id } = asignacion.data;
    const div = document.createElement("div");
    div.classList.add("asignacion", "pointer", "assigmentS");
    div.innerHTML = `
    
    <p class="column"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="eyesvg" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg> ${name}</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date">${date}</p>
    </div>
  `;
    div.id = i;
    containerM.appendChild(div);
    div.addEventListener("click", async (e) => {
      const idAsig = id;
      const asig = await buscarAsignacion(idAsig);
      const { name, date, description, porcentaje } = asig.data;
      const fechaEnt = date.split("-");
      const mesAct = new Date().getMonth() + 1;
      try {
        const idUser = URL.get("id");
        const existe = await buscarUnaAsig(idUser, idAsig);
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
            <div class="container-dateAsig">
              <p>Porcentaje:</p>
              <p>${porcentaje}%</p>
            </div>
            <div class="container-descAsig">
              <p>Descripción:</p>
              <p>${description}</p>
            </div>
            <div class="container-download">
            <label class="download-asig">Entregado</label>
            
            </div>

        `;
        } else if (
          fechaEnt[0] <= new Date().getDate() &&
          fechaEnt[1] <= mesAct &&
          fechaEnt[2] <= new Date().getFullYear
        ) {
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
              <div class="container-dateAsig">
                <p>Porcentaje:</p>
                <p>${porcentaje}%</p>
              </div>
              <div class="container-descAsig">
                <p>Descripción:</p>
                <p>${description}</p>
              </div>
              <div class="container-download">
              </div>
  
          `;
          modal.classList.remove("hidden");
          return closeModalBtn();
        } else if (asig.data.path) {
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
        <div class="container-dateAsig">
              <p>Porcentaje:</p>
              <p>${porcentaje}%</p>
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
            <div class="container-dateAsig">
              <p>Porcentaje:</p>
              <p>${porcentaje}%</p>
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
        closeModalBtn();
        const inputFile = document.querySelector("#uploadAsig");
        inputFile.addEventListener("change", () => {
          const tamaño = transformarBytes(inputFile.files[0].size);
          const extension = validarExtension(
            inputFile.files[0].name,
            inputFile
          );
          if (extension) {
            return crearMsg(
              "Solo se pueden enviar archivos comprimidos (.zip o .rar)"
            );
          }
          if (tamaño > 10) {
            inputFile.value = "";
            return crearMsg("No puede mandar un archivo tan pesado");
          }
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
            const idUser = URL.get("id");
            const post = await guardarAsignacionEstudiante(
              data,
              idSubject,
              idUser,
              idAsig,
              porcentaje
            );
            const act = await guardarAsignacionEst(post.data.id, idAsig);
            crearMsg(act.data.message);
            modal.classList.add("hidden");
          } catch (error) {
            console.log(error);
          }
        });
        modal.classList.remove("hidden");
        return closeModalBtn();
      } catch (error) {
        console.log(error);
      }
    });
  });
}

async function eliminarAsigT(e, idSubject) {
  const idAsigT = e.target.dataset.id;
  try {
    const buscar = await buscarAsignacion(idAsigT);
    const eliminar = await eliminarAsignacionT(idAsigT);
    const act = await actualizarMateria(
      idAsigT,
      idSubject,
      buscar.data.porcentaje
    );
    crearMsg(eliminar.data.message);
    e.target.parentElement.remove();
  } catch (error) {
    crearMsg(error.response.data.message);
  }
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
    guardarDatosDeAsig(idSubject);
  });
}

async function guardarDatosDeAsig(idSubject) {
  const formulario = document.querySelector("#formulario");
  const aceptar = document.querySelector("#aceptar");
  const fileAsig = document.querySelector("#fileAsig");
  eventoVal(fileAsig);
  const delAsig = document.querySelector("#delAsig");
  deleteFile(delAsig, fileAsig);

  aceptar.addEventListener("click", async (e) => {
    e.preventDefault();
    const fecha = document.querySelector("#dateAsig").value;
    const name = document.querySelector("#nameAsig").value;
    const desc = document.querySelector("#descAsig").value;
    const porcentaje = document.querySelector("#porcentajeAsig").value;
    const listaInput = [fecha, name, desc, porcentaje].some((i) => i === "");

    if (listaInput) {
      return crearMsg("No puede dejar los campos vacíos");
    }

    const materia = await buscarMateria(idSubject);
    let total = materia.data.porcentaje + Number(porcentaje);
    if (total > 100) {
      return crearMsg("Usted esta sobrepasando el 100%");
    }

    const data = new FormData(formulario);
    try {
      const post = await guardarAsignacion(data, id, idSubject);
      const act = await guardarAsignacionMat(
        post.data.id,
        idSubject,
        post.data.porcentaje
      );
      modal.classList.add("hidden");
      crearMsg(act.data.message);
    } catch (error) {
      console.log(error);
      crearMsg(error.response.data.message);
    }
  });
}

// validar inputs file

function eventoVal(input) {
  input.addEventListener("change", () => {
    const tamaño = transformarBytes(input.files[0].size);
    const extension = validarExtension(input.files[0].name, input);
    if (extension) {
      return crearMsg(
        "Solo se pueden enviar archivos comprimidos (.zip o .rar)"
      );
    }
    if (tamaño > 10) {
      input.value = "";
      return crearMsg("No puede mandar un archivo tan pesado");
    }
  });
}

function deleteFile(inputdel, input) {
  inputdel.addEventListener("click", () => {
    input.value = "";
  });
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

function transformarBytes(size) {
  const kilobyte = size / 1000;
  const megabyte = kilobyte / 1000;
  return megabyte;
}

// Pagos

async function eventoPagos() {
  const idUser = URL.get("id");
  const listadoP = await buscarDeudas(idUser);
  imprimirPagos();
  const selectQuarter = document.querySelector("#selectQuarter");
  const containerDeudas = document.querySelector(".container-deudas");
  const containertotal = document.querySelector(".container-total");
  const containerBtn = document.querySelector(".container-btnPay");
  const { data } = listadoP;
  data.forEach(async (i) => {
    const { idQuarter } = i;
    const quarter = await buscarTrimestre(idQuarter);
    const CODQuarter = Number(quarter.data.quarter);
    const fechaStart = quarter.data.startDate.split("-");
    const option = document.createElement("option");
    option.value = idQuarter;
    option.innerHTML = `${objModulo[CODQuarter]} - ${fechaStart[2]}`;
    selectQuarter.appendChild(option);
  });
  selectQuarter.addEventListener("change", async () => {
    const quarterSelected = selectQuarter.value;
    const pago = await buscarDeuda(idUser, quarterSelected);
    const { deuda, subjects } = pago.data[0];
    const listSub = JSON.parse(subjects);
    listSub.forEach(async (i) => {
      const infoSub = await buscarInfoMateria({ CODSubject: i });
      const { price, name } = infoSub.data[0];
      const div = document.createElement("div");
      div.classList.add("deuda");
      div.innerHTML = `
      <span>${name}</span>
      <span>$${Number(price)}</span>
      `;
      containerDeudas.appendChild(div);
    });
    const div = document.createElement("div");
    div.classList.add("totalDeuda");
    const bcv = await axios.get(
      "https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv"
    );
    div.innerHTML = `
    <span>Deuda Total: $${deuda}</span>
    <span>Tasa BCV: ${bcv.data.price}</span>
    `;
    containertotal.appendChild(div);
    const btn = document.createElement("button");
    btn.classList.add("pagoBtn");
    btn.innerHTML = "Ingresar Pago";
    containerBtn.appendChild(btn);
    btn.addEventListener("click", () => {
      if (Number(deuda) === 0) {
        crearMsg("Usted no tiene deuda");
      } else {
        realizarPago(quarterSelected);
      }
    });
  });
}

async function realizarPago(idQuarter) {
  modal.classList.remove("hidden");
  imprimirPagoModal();
  closeModalBtn();
  const payDate = document.querySelector("#payDate");
  const payNumber = document.querySelector("#payNumber");
  const payMount = document.querySelector("#payMount");
  const delPay = document.querySelector("#delPay");
  const payCap = document.querySelector("#payCap");
  eventoVal(payCap);
  deleteFile(delPay, payCap);
  flatpickr("#payDate", {
    dateFormat: "d-m-Y",
  });

  payNumber.addEventListener("input", () => {
    const valor = payNumber.value;
    if (valor.length >= 12) {
      payNumber.value = valor.slice(0, 12);
    }
  });

  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const validate = [
      payDate.value,
      payNumber.value,
      payCap.value,
      payMount.value,
    ].some((i) => i === "");
    if (validate) {
      return crearMsg("No puede dejar los campos vacíos");
    }
    const idUser = URL.get("id");
    const data = new FormData(formulario);
    if (isNaN(payMount.value) || isNaN(payNumber.value)) {
      return crearMsg("No ha introducido cantidades válidas");
    }
    if (payNumber.length > 12) {
      return crearMsg("Usted ha sobrepasado la cantidad de dígitos");
    }
    try {
      const procesar = await procesarPago(data, idUser, idQuarter);
      crearMsg(procesar.data.message);
      modal.classList.add("hidden");
    } catch (error) {
      console.log(error);
    }
  });
}
