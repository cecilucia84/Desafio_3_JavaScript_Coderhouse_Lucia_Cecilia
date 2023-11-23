const CakeEnCarrito = JSON.parse(localStorage.getItem("productos_en_carrito")) || [];

const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito_productos");
const contenedorCarritoAcciones = document.querySelector("#carrito_acciones");
const contenedorCarritoComprado = document.querySelector("#carrito_comprado");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");

// Función para resetear el carrito
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
            <button class="carrito_producto_eliminar" id=${torta.ID}><i class="bi bi-trash3-fill"></i></button>
        </div>`;
        contenedorCarritoProductos.appendChild(div);
    });

    actualizarBotonesEliminar();
}

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (e) => {

            const id = e.currentTarget.id; 
            const nuevosProductos = CakeEnCarrito.filter((producto) => producto.ID != id);
            localStorage.setItem("productos_en_carrito", JSON.stringify(nuevosProductos));
            location.reload();
        });
    });
}

// Esta función suma el subtotal de cada producto y lo muestra en el contenedor total
function actualizarTotal() {
    let total = 0;
    CakeEnCarrito.forEach((producto) => {
        total += producto.PRECIO * producto.cantidad;
    });
    contenedorTotal.textContent = "$" + total;
}

actualizarTotal();

botonVaciar.addEventListener("click", () => {
   //Se vacia el localStorage y se resetea el carrito
    resetearCarrito();
});

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    localStorage.setItem("productos_en_carrito", JSON.stringify([]));

    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorTotal.classList.add("disabled"); 
    contenedorCarritoComprado.classList.remove("disabled");
}