const container = document.querySelector("#container-main");
const container2 = document.querySelector("#container-modal");
const objModulo = {
  101: "Módulo A",
  102: "Módulo B",
  103: "Módulo C",
  104: "Módulo de Verano",
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

const imprimirAplicar = (estudiante) => {
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
              <span>${estudiante.cedula}</span>
            </div>
            <div>
              <span>Nombre:</span>
              <span>${estudiante.fullName}</span>
            </div>
            <div>
              <span>Email:</span>
              <span>${estudiante.email}</span>
            </div>
            <div>
              <span>Teléfono:</span>
              <span>${estudiante.telefono}</span>
            </div>
            <div>
              <span>Teléfono de Casa:</span>
              <span>${estudiante.telfCasa}</span>
            </div>
            <div>
              <span>Calle:</span>
              <span>${estudiante.calle}</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>${estudiante.ciudad}</span>
            </div>
            <div>
              <span>Estado/Provincia:</span>
              <span>${estudiante.estado}</span>
            </div>
            <div>
              <span>ZIP/Código postal:</span>
              <span>${estudiante.codigopost}</span>
            </div>
            <div>
              <span>País:</span>
              <span>${estudiante.pais}</span>
            </div>
            <div>
              <span>Fecha Nacimiento:</span>
              <span>${estudiante.fechaNac}</span>
            </div>
            <div>
              <span>Sexo:</span>
              <span>${estudiante.Sexo}</span>
            </div>
            <div>
              <span>Lugar de nacimiento:</span>
              <span>${estudiante.lugarNac}</span>
            </div>
            <div>
              <span>Nacionalidad:</span>
              <span>${estudiante.nacionalidad}</span>
            </div>
            <div>
              <span>Estado Civil:</span>
              <span>${estudiante.estCivil}</span>
            </div>
            <div>
              <span>Inscrito en:</span>
              <span>${objModulo[Number(estudiante.inscrito)]}</span>
            </div>
            <div>
              <span>Programa:</span>
              <span>${objCarreras[Number(estudiante.programa)]}</span>
            </div>
            <div>
              <span>Prueba CNU:</span>
              <span>${estudiante.cnu}</span>
            </div>
            <div>
              <span>Nombre contacto emergencia:</span>
              <span>${estudiante.nomEmer}</span>
            </div>
            <div>
              <span>Relación:</span>
              <span>${estudiante.relacion}</span>
            </div>
            <div>
              <span>Teléfono de emergencia:</span>
              <span>${estudiante.telfEmer}</span>
            </div>
            <div>
              <span>Teléfono de casa:</span>
              <span>${estudiante.telfEmerCasa}</span>
            </div>
            <div>
              <span>Teléfono de trabajo:</span>
              <span>${estudiante.telfEmerTr}</span>
            </div>
            <div>
              <span>Nombre del representante:</span>
              <span>${estudiante.nomRep}</span>
            </div>
            <div>
              <span>Relación:</span>
              <span>${estudiante.relacionRep}</span>
            </div>
            <div>
              <span>Teléfono:</span>
              <span>${estudiante.telfRep}</span>
            </div>
            <div>
              <span>Email:</span>
              <span>${estudiante.emailRep}</span>
            </div>
            <div>
              <span>Calle:</span>
              <span>${estudiante.calleRep}</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>${estudiante.ciudadRep}</span>
            </div>
            <div>
              <span>Estado/Provincia:</span>
              <span>${estudiante.estadoRep}</span>
            </div>
            <div>
              <span>País:</span>
              <span>${estudiante.paisRep}</span>
            </div>
            <div>
              <span>Código Postal:</span>
              <span>${estudiante.codigopostRep}</span>
            </div>
            <div>
              <span>Nombre del Plantel:</span>
              <span>${estudiante.plantel}</span>
            </div>
            <div>
              <span>Tipo de Plantel:</span>
              <span>${estudiante.tipoPlantel}</span>
            </div>
            <div>
              <span>Especialidad:</span>
              <span>${estudiante.especialidad}</span>
            </div>
            <div>
              <span>Índice de Rendimiento Académico:</span>
              <span>${estudiante.rendimiento}</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>${estudiante.ciudadPlantel}</span>
            </div>
            <div>
              <span>Estado:</span>
              <span>${estudiante.estadoPlantel}</span>
            </div>
            <div>
              <span>País:</span>
              <span>${estudiante.paisPlantel}</span>
            </div>
            <div>
              <span>Trabaja?</span>
              <span>${estudiante.trabaja}</span>
            </div>
            <div>
              <span>Sector laboral:</span>
              <span>${estudiante.sector}</span>
            </div>
            <div>
              <span>Nombre de la Empresa:</span>
              <span>${estudiante.nomEm}</span>
            </div>
            <div>
              <span>Dirección de la empresa:</span>
              <span>${estudiante.direcEm}</span>
            </div>
            <div>
              <span>Ciudad:</span>
              <span>${estudiante.ciudadEm}</span>
            </div>
            <div>
              <span>Estado/Provincia:</span>
              <span>${estudiante.estadoEm}</span>
            </div>
            <div>
              <span>País:</span>
              <span>${estudiante.paisEm}</span>
            </div>
            <div>
              <span>Nombre del supervisor:</span>
              <span>${estudiante.nomSup}</span>
            </div>
            <div>
              <span>Teléfono de la empresa:</span>
              <span>${estudiante.telfEm}</span>
            </div>
            <div>
              <span>Institución Universitaria:</span>
              <span>${estudiante.instU}</span>
            </div>
            <div>
              <span>Título Obtenido:</span>
              <span>${estudiante.tituloObt}</span>
            </div>
            <div>
              <span>Fecha de graduación:</span>
              <span>${estudiante.fechaGrad}</span>
            </div>
            <div>
              <span>Tiene discapacidad?:</span>
              <span>${estudiante.discapacidad}</span>
            </div>
            <div>
              <span>Descripción de la discapacidad:</span>
              <span>${estudiante.descDisc}</span>
            </div>
            <div>
              <span>Tiene dificultades del aprendizaje?:</span>
              <span>${estudiante.difAp}</span>
            </div>
            <div>
              <span>Descripción de la dificultad:</span>
              <span>${estudiante.descDif}</span>
            </div>
            <div>
              <span>Fecha de solicitud:</span>
              <span>${estudiante.fechaSol}</span>
            </div>
            <div>
              <span>Nombre del representante legal:</span>
              <span>${estudiante.nomRep}</span>
            </div>
          </div>
          <div class="container-downloadPensum container-downloadData">
            <span>Descargar Foto Cédula</span>
            <a href="../${estudiante.cedulaPath}" class="download-pensum">
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
            <a download href="../${
              estudiante.tituloPath
            }" class="download-pensum">
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
            <a download href="../${
              estudiante.notasPath
            }" class="download-pensum">
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
            <a download href="../${
              estudiante.opsuPath
            }" class="download-pensum">
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
            <a download href="../${
              estudiante.nacimientoPath
            }" class="download-pensum">
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
            <a download href="../${
              estudiante.conductaPath
            }" class="download-pensum">
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
            <a download href="../${
              estudiante.militarPath
            }" class="download-pensum">
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

const imprimirCrearMatProf = () => {
  container.innerHTML = `
  <div class="container-asig">
          <section>
            <h3 id="titulo" class="container-titulo">Crear Materia</h3>
          </section>
          <form id="formCreate" class="form-create" action="">
            <div class="selects">
              <label for="selectFac">Elegir Facultad</label>
              <select name="selectFac" id="selectFac">
                <option selected disabled value="">...</option>
                <option value="3001">Facultad de Diseño</option>
                <option value="3002">Facultad de Administración</option>
                <option value="3003">Facultad de Derecho</option>
                <option value="3004">Facultad de Ingienería</option>
                <option value="3005">Facultad de Educación</option>
              </select>
            </div>
            <div class="selects">
              <label for="selectCareer">Elegir Carrera</label>
              <select name="selectCareer" id="selectCareer">
                <option selected disabled value="">...</option>
              </select>
            </div>
            <div class="selects">
              <label for="selectSubject">Elegir materia</label>
              <select name="selectSubject" id="selectSubject">
                <option selected disabled value="">...</option>
              </select>
            </div>
            <div class="times">
              <label for="startClass">Inicio de la clase</label>
              <input type="time" name="startClass" id="startClass" />
            </div>
            <div class="times">
              <label for="endClass">Fin de la clase</label>
              <input type="time" name="endClass" id="endClass" />
            </div>
            <div class="days">
              <label for="">Elegir días</label>

              <div class="inputDays">
                <div>
                  <input name="lunes" value="1" type="checkbox" /> Lunes
                </div>
                <div>
                  <input name="martes" value="2" type="checkbox" /> Martes
                </div>
                <div>
                  <input name="miercoles" value="3" type="checkbox" /> Miércoles
                </div>
                <div>
                  <input name="jueves" value="4" type="checkbox" /> Jueves
                </div>
                <div>
                  <input name="viernes" value="5" type="checkbox" /> Viernes
                </div>
                <div>
                  <input name="sabado" value="6" type="checkbox" /> Sábado
                </div>
              </div>
            </div>
            <div class="container-svgCreate">
              <label for="filePensum">Agregar Pensum</label>
              <div>
                <label class="label-svg" for="filePensum">
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
                  id="delPensum"
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

              <input type="file" name="" id="filePensum" />
            </div>

            <button class="btnCreate" type="submit">Enviar</button>
          </form>
        </div>
  `;
};

const imprimir404 = (titulo, message) => {
  container.innerHTML = `
  <div class="container-asig">
          <section>
            <h3 id="titulo" class="container-titulo">${titulo}</h3>
          </section>
          <p style="display: grid; place-items: center">
            ${message}
          </p>
        </div>
  `;
};
