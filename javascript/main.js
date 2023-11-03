
let productosEnCarrito = [];

// DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductosJSON() {
        fetch('productos.json')
            .then((resp) => resp.json())
            .then(function(productosElegidos){
                productos = productosElegidos;
                filtrarProductos(productosElegidos);
            })
}

function filtrarProductos(productosElegidos){
        contenedorProductos.innerHTML = "";
        productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.imagen}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-preci0">${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `;
            contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}
cargarProductosJSON();
actualizarBotonesAgregar();

botonesCategorias.forEach(boton => {boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaSeleccionada = e.currentTarget.id;

        if (categoriaSeleccionada != "todos") {
            const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaSeleccionada);
            const categoria = productosFiltrados[0].categoria.nombre;
            tituloPrincipal.innerText = categoria;
            filtrarProductos(productosFiltrados);
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            filtrarProductos(productos);
        }
    });
});

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find( producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumero();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}   
    document.addEventListener("DOMContentLoaded", () => {
        actualizarNumero();
    });