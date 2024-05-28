import { buscarEstudiante } from "./apis/APIstudent.js";
import { buscarProfesor } from "./apis/APIteachers.js";
import { buscarMateria, guardarAsignacionMat } from "./apis/APIsubject.js";
import { buscarUsuario } from "./apis/APIuser.js";
import {
  buscarAsignacion,
  guardarAsignacion,
  guardarAsignacionEst,
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

const containerMaterias = document.querySelector("#materias");
const listadoMaterias = document.querySelector(".listadoMaterias");
const containerMsg = document.querySelector("#containerMsg");
const message = document.querySelector("#message");
const modal = document.querySelector("#modal");
const containerModal = document.querySelector("#container-modal");
const URL = new URLSearchParams(window.location.search);
const rol = URL.get("rol");
const id = URL.get("id");

containerMaterias.addEventListener("click", (e) => {
  e.preventDefault();
  listadoMaterias.classList.toggle("hidden");
});

function crearMsg(text) {
  containerMsg.classList.add("messageAnimation");
  message.innerHTML = text;

  setTimeout(() => {
    containerMsg.classList.remove("messageAnimation");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", async () => {
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
});

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
    crearBtn();
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
          crearMsg(eliminar.data.message);
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

async function crearBtn() {
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
    guardarDatos(id);
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
