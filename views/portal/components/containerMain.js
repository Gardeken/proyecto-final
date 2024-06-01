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
