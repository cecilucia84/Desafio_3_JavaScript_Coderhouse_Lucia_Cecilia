class TiendaTortas {
    constructor(id, titulo, precio, imagen) {
        this.ID = id;
        this.TITULO = titulo;
        this.PRECIO = precio;
        this.IMAGEN = imagen;
    }
}

const arrayTortas = [
    new TiendaTortas(1, 'Chocotorta', 3500, '../recursos/chocotorta.jpg'),
    new TiendaTortas(2, 'Torta Cono', 4000, '../recursos/Romi con torta cono.webp'),
    new TiendaTortas(3, 'Princess Cake', 4500, '../recursos/Romi con torta princesa.jpg'),
    new TiendaTortas(4, 'Donuts Cake', 4500, '../recursos/Torta Donuts.webp'),
    new TiendaTortas(5, 'Letter Cake', 4000, '../recursos/Torta Letra.webp'),
    new TiendaTortas(6, 'Ball Cake', 4500, '../recursos/Torta pelotas de colores.webp'),
];

const containerTortas = document.querySelector("#container-tortas");
let botonAgregar = document.querySelectorAll(".agregar_producto");
const numerito = document.querySelector("#numerito");

let productosEnCarrito = [];

let productosEnCarritoLS = localStorage.getItem("productos_en_carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function cargarProductos() {
    arrayTortas.forEach((torta) => {
        const div = document.createElement("div");
        div.classList.add("torta");
        div.innerHTML = `
          <img class="torta_imagen" src="${torta.IMAGEN}" alt="${torta.TITULO}">
          <div class="torta_detalles">
            <h3 class="torta_titulo">${torta.TITULO}</h3>
            <p class="torta_precio">$${torta.PRECIO}</p>
            <label for="cantidad-${torta.ID}">Cantidad:</label>
            <input type="number" id="cantidad-${torta.ID}" value="1" min="1">
            <button class="agregar_producto" id="${torta.ID}">Agregar</button>
          </div>
        `;

        containerTortas.append(div);
    });


actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    botonAgregar = document.querySelectorAll(".agregar_producto");

    botonAgregar.forEach((boton) => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(event) {
    const productId = parseInt(event.target.id);
    const cantidadInput = document.getElementById(`cantidad-${productId}`);
    const cantidad = parseInt(cantidadInput.value);

    const productoAgregado = arrayTortas.find((torta) => torta.ID === productId);

    if (productoAgregado && cantidad >= 1) {
        const productoConCantidad = { ...productoAgregado, cantidad };
        productosEnCarrito.push(productoConCantidad);
        console.log("Producto agregado al carrito:", productoConCantidad);
    
        actualizarNumerito();
        
        localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
    } else {
        console.error("No se pudo agregar el producto al carrito.");
    }
}

function actualizarNumerito() {
    const numerito = document.getElementById("numerito");
    
    let totalCantidad = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = totalCantidad;
}

cargarProductos();
actualizarBotonesAgregar();