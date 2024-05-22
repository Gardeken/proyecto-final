const container = document.querySelector("#container-main");

const imprimirContainer = () => {
  container.innerHTML = `<div class="container-asig">
<section>
  <h3 class="container-titulo">Asignaciones</h3>
</section>
<div id="asignaciones" class="container-asignaciones">
  <div id="asignacion" class="asignacion">
    <p>Nombre</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p>Fecha de entrega</p>
    </div>
  </div>
</div>
</div>`;
};
