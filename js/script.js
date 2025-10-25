document.addEventListener("DOMContentLoaded", () => {
  const pista = document.querySelector(".pista-carousel");
  const items = document.querySelectorAll(".item-carousel");
  const btnAnterior = document.querySelector(".anterior");
  const btnSiguiente = document.querySelector(".siguiente");
  const contIndicadores = document.querySelector(".indicadores-carousel");

  let indice = 0;
  let intervalo;


  items.forEach((_, i) => {
    const boton = document.createElement("button");
    if (i === 0) boton.classList.add("activo");
    boton.addEventListener("click", () => moverACarousel(i));
    contIndicadores.appendChild(boton);
  });

  const indicadores = contIndicadores.querySelectorAll("button");

  function actualizarIndicadores() {
    indicadores.forEach(btn => btn.classList.remove("activo"));
    indicadores[indice].classList.add("activo");
  }

  function moverACarousel(i) {
    indice = i;
    pista.style.transform = `translateX(-${indice * 100}%)`;
    actualizarIndicadores();
    reiniciarAuto();
  }

  btnSiguiente.addEventListener("click", () => {
    indice = (indice + 1) % items.length;
    moverACarousel(indice);
  });

  btnAnterior.addEventListener("click", () => {
    indice = (indice - 1 + items.length) % items.length;
    moverACarousel(indice);
  });



  // Auto-deslizamiento
  function iniciarAuto() {
    intervalo = setInterval(() => {
      indice = (indice + 1) % items.length;
      moverACarousel(indice);
    }, 2500); // cada 2.5 segundos
  }

  function reiniciarAuto() {
    clearInterval(intervalo);
    iniciarAuto();
  }

  iniciarAuto();
});





