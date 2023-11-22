class tienda_tortas {
    constructor(id, titulo, precio, imagen) {
        this.id = id;
        this.titulo = titulo;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const arrayTortas = [
    new tienda_tortas(1, 'Chocotorta', 3500, 'recursos/chocotorta.jpg'),
    new tienda_tortas(2, 'Torta Cono', 4000, 'recursos/Romi con torta cono.webp'),
    new tienda_tortas(3, 'Princess Cake', 4500, 'recursos/Romi con torta princesa.jpg'),
    new tienda_tortas(4, 'Donuts Cake', 4500, 'recursos/Torta Donuts.webp'),
    new tienda_tortas(5, 'Letter Cake', 4000, 'recursos/Torta Letra.webp'),
    new tienda_tortas(6, 'Ball Cake', 4500, 'recursos/Torta pelotas de colores.webp'),
];

const containerTortas = document.querySelector("#container-tortas");
let botonAgregar = document.querySelectorAll(".agregar_producto");
const numerito = document.querySelector("#numerito");

// Esta línea no parece necesaria, ya que la variable no está definida aún
// contenedorCarritoProductos.innerHTML = "";

function cargarProductos() {
    arrayTortas.forEach((torta) => {
        const div = document.createElement("div");
        div.classList.add("torta");
        div.innerHTML = `
          <img class="torta_imagen" src="${torta.imagen}" alt="${torta.titulo}">
          <div class="torta_detalles">
            <h3 class="torta_titulo">${torta.titulo}</h3>
            <p class="torta_precio">$${torta.precio}</p>
            <label for="cantidad-${torta.id}">Cantidad:</label>
            <input type="number" id="cantidad-${torta.id}" value="1" min="1">
            <button class="agregar_producto" id="${torta.id}">Agregar</button>
          </div>
        `;

        containerTortas.append(div);
    });
}

function actualizarBotonesAgregar() {
    botonAgregar = document.querySelectorAll(".agregar_producto");

    botonAgregar.forEach((boton) => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarritoLS = localStorage.getItem("productos_en_carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(event) {
    const productId = parseInt(event.target.id);
    const cantidadInput = document.getElementById(`cantidad-${productId}`);
    const cantidad = parseInt(cantidadInput.value);

    const productoAgregado = arrayTortas.find((torta) => torta.id === productId);

    if (productoAgregado && cantidad >= 1) {
        const productoConCantidad = { ...productoAgregado, cantidad };
        productosEnCarrito.push(productoConCantidad);
        console.log("Producto agregado al carrito:", productoConCantidad);
        actualizarNumerito(); // Actualiza el numerito al agregar un producto al carrito
    } else {
        console.error("No se pudo agregar el producto al carrito.");
    }
}

function agregarProductosSeleccionadosAlCarrito() {
    const productosSeleccionados = [];

    const cantidadInputs = document.querySelectorAll("input[type='number']");

    cantidadInputs.forEach((input) => {
        const productId = parseInt(input.id.split('-')[1]);
        const cantidad = parseInt(input.value);

        if (cantidad > 0) {
            const productoAgregado = arrayTortas.find((torta) => torta.id === productId);

            if (productoAgregado) {
                const productoConCantidad = { ...productoAgregado, cantidad };
                productosSeleccionados.push(productoConCantidad);
            } else {
                console.error("No se pudo encontrar el producto con ID:", productId);
            }
        }
    });

    productosEnCarrito.push(...productosSeleccionados);

    console.log("Productos agregados al carrito:", productosSeleccionados);
    actualizarNumerito();
}

localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

function actualizarNumerito() {
    let totalCantidad = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = totalCantidad;
}

cargarProductos();
actualizarBotonesAgregar();