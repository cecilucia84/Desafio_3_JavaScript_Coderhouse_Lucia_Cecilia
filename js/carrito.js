const CakeEnCarrito = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito_productos");
const contenedorCarritoAcciones = document.querySelector("#carrito_acciones");
const contenedorCarritoComprado = document.querySelector("#carrito_comprado");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");

function resetearCarrito() {
    localStorage.clear();
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorTotal.classList.add("disabled"); 
    contenedorCarritoVacio.classList.remove("disabled");
}

if (CakeEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    contenedorCarritoProductos.innerHTML = "";
    CakeEnCarrito.forEach((torta) => {
        const div = document.createElement("div");
        div.classList.add("carrito_producto");
        div.innerHTML = `
            <img class="carrito_producto_imagen" src="${torta.IMAGEN}" alt="">
            <div class="carrito_producto_titulo">
                <small>Titulo</small>
                <h3>${torta.TITULO}</h3>
            </div>
            <div class="carrito_producto_cantidad">
                <small>Cantidad</small>
                <p>${torta.cantidad}</p>
            </div>
            <div class="carrito_producto_precio">
                <small>Precio</small>
                <p>$${torta.PRECIO}</p>
            </div>
            <div class="carrito_producto_subtotal">
                <small>Subtotal</small>
                <p>$${torta.PRECIO * torta.cantidad}</p>
            </div>
            <button class="carrito_producto_eliminar" id=${torta.id}><i class="bi bi-trash3-fill"></i></button>
        </div>`;
        contenedorCarritoProductos.appendChild(div);
    });
    actualizarBotonesEliminar();
}

function eliminarDelCarrito(e) {
    const uniqueID = e.currentTarget.id; 
    let found = false;
    const nuevosProductos = CakeEnCarrito.filter((torta) => {
        if (String(torta.id) !== uniqueID || found) {
            return true;
        }
        found = true;
        return false;
    });
    localStorage.setItem("productos_en_carrito", JSON.stringify(nuevosProductos));
    location.reload();
}

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function actualizarTotal() {
    if (contenedorTotal) {
        let total = 0;
        CakeEnCarrito.forEach((torta) => {
            total += torta.PRECIO * torta.cantidad;
        });
        contenedorTotal.textContent = "$" + total;
    }
}
actualizarTotal();

if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
        resetearCarrito();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    if (botonComprar) {
        botonComprar.addEventListener("click", comprarCarrito);
    }
});

function comprarCarrito() {
    localStorage.setItem("productos_en_carrito", JSON.stringify([]));
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorTotal.classList.add("disabled"); 
    contenedorCarritoComprado.classList.remove("disabled");
}