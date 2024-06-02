const container = document.querySelector("#container-main");
const container2 = document.querySelector("#container-modal");

const imprimirContainerEst = () => {
  container.innerHTML = `<div class="container-asig">
<section>
  <h3 id="titulo" class="container-titulo">Asignaciones</h3>
</section>
<div id="asignaciones" class="container-asignaciones">
  <div id="asignacion" class="asignacion">
    <p class="column">Nombre</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date blockh">Fecha de entrega</p>
    </div>
  </div>
</div>
</div>`;
};

const imprimirContainerAdmin = () => {
  container.innerHTML = `
  <div class="container-asig">
  <section>
    <h3 id="titulo" class="container-titulo">Asignaciones</h3>
  </section>
  <div id="asignaciones" class="container-asignaciones">
  <div class="asignacion container-search">
    <input placeholder="Nombre del estudiante" class="inputSearch" id="studentName" type="text">
    <input placeholder="ID del estudiante" class="inputSearch" id="studentID" type="text">
    <input placeholder="Email del estudiante" class="inputSearch" id="studentEmail" type="text">
    </div>
  </div>
  <div id="estudiantes" class="container-estudiantes"></div>
</div>`;
};

const imprimirContainerProf = () => {
  container.innerHTML = `
    <div class="container-asig">
          <section>
            <h3 id="titulo" class="container-titulo">Alumnos</h3>
          </section>
          <div class="container-btn">
            <div>
              <button id="alumnos" class="btnProf">Alumnos</button>
              <button id="calendario" class="btnProf">Calendario</button>
              <button id="asig" class="btnProf">Asignaciones</button>
            </div>
          </div>
          <div id="asignaciones" class="container-asignaciones">
            <div id="asignacion" class="asignacion">
              <p class="column">Nombre</p>
              <div class="container-fecha">
                <div class="separador"></div>
                <p class="container-date blockh">Datos</p>
              </div>
            </div>
          </div>
        </div>`;
};

const imprimirCrearAsig = () => {
  container2.innerHTML = `
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
  <form id="formulario" class="container-input-Asig">
  <div>
    <label for="nameAsig">Nombre de la asignación</label>
    <input name="campos" id="nameAsig" type="text" />
  </div>
  <div>
    <label for="dateAsig">Fecha máxima de entrega</label>
    <input placeholder="Seleccione una fecha..." name="campos" id="dateAsig" type="text" />
  </div>
  <div>
    <label for="descAsig">Descripción de la asignación</label>
    <textarea name="campos" id="descAsig"></textarea>
  </div>
  <div class="container-file">
    <div class="container-label">
      <label for="fileAsig">Cargar un archivo *Opcional</label>
      <div class="container-svg">
        <label class="label-svg" for="fileAsig">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="upload-svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </label>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="delAsig"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="delete-file"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
    <input name="teacherAsig" id="fileAsig" type="file" />
  </form>
  <div>
    <button id="aceptar">Aceptar</button>
  </div>
</div>`;
};

const imprimirContainerStaff = () => {
  container.innerHTML = `
  <div class="container-asig">
          <section>
            <h3 id="titulo" class="container-titulo">Trimestres</h3>
          </section>
        </div>
        <div>
          <button class="btnQuarter">Crear Trimestre</button>
        </div>
        <div class="container-modulos"></div>
  `;
};

const imprimirCrearTrim = () => {
  container2.innerHTML = `
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
        <div class="container-quarter">
          <div class="input-quarter">
            <label for="startDate">Fecha de inicio</label>
            <input id="startDate" class="inputQuarter" type="text" />
          </div>
          <div class="input-quarter">
            <label for="endDate">Fecha de finalización</label>
            <input id="endDate" class="inputQuarter" type="text" />
          </div>
          <div class="input-dates">
            <div class="input-quarter"> 
            <label for="startinscDate">Inicio de inscripciones</label>
            <input id="startinscDate" class="inputQuarter" type="text" />
            </div>
            <span>Esta es la fecha en la que empezarán las incripciones para las materias de este trimestre</span>
            </div>
            <div class="input-dates">
            <div class="input-quarter">
            <label for="endinscDate">Fin inscripciones</label>
            <input id="endinscDate" class="inputQuarter" type="text" />
            </div>
            <span>Esta es la fecha en la que acabarán las inscripciones</span>
          </div>
          <div class="input-dates">
            <div class="input-quarter">
            <label for="startcreateDate">Inicio de creación de materias</label>
            <input id="startcreateDate" class="inputQuarter" type="text" />
            </div>
            <span>Esta es la fecha en la que los profesores crearan sus materias para este trimestre</span>
          </div>
          <div class="input-dates">
            <div class="input-quarter">
            <label for="endcreateDate">Fin de creación de materias</label>
            <input id="endcreateDate" class="inputQuarter" type="text" />
            </div>
            <span>Esta es la fecha en la que terminará el proceso de creación de materias</span>
          </div>
          <div class="input-quarter">
            <label for="selectQuarter">Seleccione trimestre</label>
            <select id="selectQuarter" class="selectQuarter inputQuarter">
              <option selected disabled value="">...</option>
              <option value="101">Módulo A</option>
              <option value="102">Módulo B</option>
              <option value="103">Módulo C</option>
              <option value="104">Módulo de Verano</option>
            </select>
          </div>
          <button id="aceptar" class="quarterBtn">Aceptar</button>
        </div>
  `;
};

const imprimirCambioDatos = (desc) => {
  container2.innerHTML = `
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
        <div class="desc-datos">
          <span>Descripción: </span>
          <p>
            ${desc}
          </p>
        </div>
        <div class="container-Opt">
          <button id="aceptar" class="btnData">Aceptar</button>
          <button id="rechazar" class="btnData">Rechazar</button>
        </div>
  `;
};

const imprimirCrearMat = () => {
  container2.innerHTML = `
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
        <div class="container-crearMat">
          <div class="desc-crearMat">
            <div>
              <span> Profesor: </span>
              <span> Daniuska Soto </span>
            </div>

            <div>
              <span> Facultad: </span>
              <span> Facultad de Diseño </span>
            </div>
            <div>
              <span> Carrera: </span>
              <span> Diseño Gráfico </span>
            </div>
            <div>
              <span> Materia: </span>
              <span> Taller de Diseño Gráfico I </span>
            </div>
          </div>
          <div class="container-downloadPensum">
            <span>Descargar Pensum</span>
            <a download="" id="downloadPensum" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="opt-crearMat">
            <button id="aceptar" class="btnData">Aceptar</button>
            <button id="rechazar" class="btnData">Rechazar</button>
          </div>
        </div>
  `;
};

const imprimirContactar = () => {
  container2.innerHTML = `
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
        <div class="container-contactar">
          <div>
            <span>Nombre:</span>
            <span>Pedro Centeno</span>
          </div>
          <div>
            <span>Email:</span>
            <span>pedroignacio931@gmail.com</span>
          </div>
          <div>
            <span>Teléfono:</span>
            <span>04122101116</span>
          </div>
          <div>
            <span>Mensaje:</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              vero quibusdam alias nesciunt. Molestias aspernatur tempore
              assumenda, soluta temporibus consectetur beatae ipsa nostrum, unde
              sapiente ipsam molestiae, nulla incidunt. Ut?
            </p>
          </div>
        </div>
`;
};

const imprimirProcePago = () => {
  container2.innerHTML = `
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
        <div class="container-pagos">
          <div>
            <span>Nombre:</span>
            <span>Pedro Centeno</span>
          </div>
          <div>
            <span>Monto:</span>
            <span>Bs. 4500</span>
          </div>
          <div>
            <span>Banco:</span>
            <span>Banesco</span>
          </div>
          <div>
            <span>N° Recibo:</span>
            <span>5426879548</span>
          </div>
        </div>
        <div class="container-downloadPensum">
          <span>Descargar Captura</span>
          <a download="" id="downloadCap" class="download-pensum">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="download-pensumsvg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </a>
        </div>
        <div class="opt-crearMat">
          <button id="aceptar" class="btnData">Aceptar</button>
          <button id="rechazar" class="btnData">Rechazar</button>
        </div>
  `;
};

const imprimirAplicar = () => {
  container2.innerHTML = `
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
        <div class="datos-est">
          <div class="container-datosEst">
            <div>
              <span>Cédula:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Email:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono de Casa:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Calle:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Estado/Provincia:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>ZIP/Código postal:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>País:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Fecha Nacimiento:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Sexo:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Lugar de nacimiento:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nacionalidad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Estado Civil:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Inscrito en:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Programa:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Prueba CNU:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre contacto emergencia:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Relación:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono de emergencia:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono de casa:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono de trabajo:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre del representante:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Relación:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Email:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Calle:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Estado/Provincia:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>País:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Código Postal:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre del Plantel:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Tipo de Plantel:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Especialidad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Índice de Rendimiento Académico:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Estado:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>País:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Trabaja?</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Sector laboral:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre de la Empresa:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Dirección de la empresa:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Estado/Provincia:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>País:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre del supervisor:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Teléfono de la empresa:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Institución Universitaria:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Título Obtenido:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Fecha de graduación:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Tiene discapacidad?:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Descripción de la discapacidad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Tiene dificultades del aprendizaje?:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Descripción de la dificultad:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Fecha de solicitud:</span>
              <span>Pedro Centeno</span>
            </div>
            <div>
              <span>Nombre del representante legal:</span>
              <span>Pedro Centeno</span>
            </div>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Cédula</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Título</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Notas</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Certificado Opsu</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Partida Nacimiento</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Carta buena conducta</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Servicio militar</span>
            <a download="" class="download-pensum">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="download-pensumsvg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </a>
          </div>
          <div class="opt-crearMat">
          <button id="aceptar" class="btnData">Aceptar</button>
          <button id="rechazar" class="btnData">Rechazar</button>
        </div>
        </div>
  `;
};

const imprimirCrearUsuModal = () => {
  container2.innerHTML = `
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
        <div class="container-createUser">
          <div class="create-user">
            <label for="createUser">Crear usuario</label>
            <input class="create-userInput" id="createUser" type="text" />
          </div>
          <div class="create-user">
            <label for="passwordUser">Crear contraseña</label>
            <input class="create-userInput" id="passwordUser" type="text" />
          </div>
          <div class="container-createBtn">
            <button class="createBtn">Crear</button>
          </div>
        </div>
  `;
};

const imprimirPeticiones = () => {
  container.innerHTML = `
  <div class="container-asig">
          <section>
            <h3 id="titulo" class="container-titulo">Peticiones</h3>
          </section>
          <div class="container-selectReq">
            <label for="typeRequest">Filtrar por tipo</label>
            <select class="select-req" id="typeRequest">
              <option value="">...</option>
              <option value="4001">Cambio de datos</option>
              <option value="4002">Aplicación</option>
              <option value="4003">Crear Materia</option>
              <option value="4004">Procesar Pago</option>
              <option value="4005">Contactar</option>
            </select>
          </div>
          <div class="container-request"></div>
        </div>
  `;
};
