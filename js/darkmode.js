document.addEventListener("DOMContentLoaded", () => {
  const modoBtn = document.querySelectorAll("#modoOscuroToggle, #themeToggle");

  if (modoBtn.length > 0) { // Solo si existen botones
    const cambiarIcono = (modo) => {
      modoBtn.forEach(btn => {
        btn.textContent = modo ? "☀️" : "🌙";
        btn.title = modo ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
      });
    };

   // Activa el modo guardado si habia uno
    if (localStorage.getItem("modoOscuro") === "true") {
      document.body.classList.add("dark-mode");
    }
    cambiarIcono(document.body.classList.contains("dark-mode"));


    modoBtn.forEach(btn => {
      btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const modoActivado = document.body.classList.contains("dark-mode");
        localStorage.setItem("modoOscuro", modoActivado);
        cambiarIcono(modoActivado);
      });
    });
  }
});
