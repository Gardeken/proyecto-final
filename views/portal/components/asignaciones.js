const container = document.querySelector("#container-main");

const imprimirContainerEst = () => {
  container.innerHTML = `<div class="container-asig">
<section>
  <h3 class="container-titulo">Asignaciones</h3>
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
