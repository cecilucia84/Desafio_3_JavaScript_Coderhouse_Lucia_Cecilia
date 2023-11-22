const productosEnCarrito = JSON.parse(localStorage.getItem("productos_en_carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito_productos");
const contenedorCarritoAcciones = document.querySelector("#carrito_acciones");
const contenedorCarritoComprado = document.querySelector("#carrito_comprado");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");

if (productosEnCarrito) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    productosEnCarrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("carrito_producto");
        div.innerHTML = `
            <img class="carrito_producto_imagen" src="${producto.imagen}" alt="">
            <div class="carrito_producto_titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito_producto_cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito_producto_precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito_producto_subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito_producto_eliminar" id=${producto.id}><i class="bi bi-trash3-fill"></i></button>
        </div>`;
        contenedorCarritoProductos.append(div);
    });
} else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductos();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
    cargarProductos();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}

// Llamamos a la función para actualizar el total al cargar la página
actualizarTotal();