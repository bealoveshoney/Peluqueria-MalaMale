const carrito = document.getElementById("carrito");
const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const botonCarrito = document.getElementById("botonCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const botonFinalizar = document.getElementById("finalizar");


let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];


function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carritoItems));
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let totalPrecio = 0;

  carritoItems.forEach((item, index) => {
    totalPrecio += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio.toLocaleString()}
      <button onclick="eliminarDelCarrito(${index})">✕</button>
    `;
    listaCarrito.appendChild(li);
  });

  total.textContent = totalPrecio.toLocaleString();
  guardarCarrito();
}

function eliminarDelCarrito(index) {
  carritoItems.splice(index, 1);
  actualizarCarrito();
}

document.querySelectorAll(".agregar-carrito").forEach(btn => {
  btn.addEventListener("click", () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    carritoItems.push({ nombre, precio });
    actualizarCarrito();
    carrito.classList.remove("oculto");
  });
});

vaciarCarrito.addEventListener("click", () => {
  carritoItems = [];
  actualizarCarrito();
   localStorage.removeItem("carrito");
});

botonCarrito.addEventListener("click", () => {
  carrito.classList.toggle("oculto");
});

cerrarCarrito.addEventListener("click", () => {
  carrito.classList.add("oculto");
});

if (botonFinalizar) {
    botonFinalizar.addEventListener("click", () => {
    if (carritoItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    
    let tratamientos = [];
    let productos = [];
    let totalPrecio = 0;

    carritoItems.forEach(item => {
      totalPrecio += item.precio;
      const nombre = item.nombre.toLowerCase();
      if (
        nombre.includes("tratamiento") ||
        nombre.includes("peinado") ||
        nombre.includes("alisado") ||
        nombre.includes("color") ||
        nombre.includes("corte")
      ) {
        tratamientos.push(item.nombre);
      } else {
        productos.push(item.nombre);
      }
    });
    
    let mensaje = "¡Hola! 😊 ";

    if (tratamientos.length > 0) {
      mensaje += `Quiero reservar el tratamiento${tratamientos.length > 1 ? "s" : ""} ${tratamientos.join(", ")}`;
    }

    if (productos.length > 0) {
      mensaje += tratamientos.length > 0 ? " y también pedir " : "Quisiera pedir ";
      mensaje += `el producto${productos.length > 1 ? "s" : ""} ${productos.join(", ")}`;
    }

    mensaje += `. El total estimado es de $${totalPrecio.toLocaleString()}.`;

    
    const numeroWhatsApp = "5491123891611";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Para abrir WhatsApp en una nueva pestaña
    window.open(url, "_blank");
});

}

document.addEventListener("DOMContentLoaded", actualizarCarrito);