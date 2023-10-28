
let productosEnCarrito = [];

const productos = [
    {
        id: "cafeteria",
        titulo: "Cafeteria",
        imagen: "./assets/img/bkry-orth-1.png",
        categoria:{
            nombre: "Estructuras",
            id: "estructuras",
        },
        precio: 5000
    },
    {
        id: "planeta-goose",
        titulo: "PLaneta Goose",
        imagen: "./assets/img/goose-avatar-1.png",
        categoria:{
            nombre: "Mapas",
            id: "mapas",
        },
        precio: 10000
    },
    {
        id: "gato-02",
        titulo: "Gato 02",
        imagen: "./assets/img/gato-02.png",
        categoria:{
            nombre: "Personajes",
            id: "personajes",
        },
        precio: 1000
    },
    {
        id: "gato-08",
        titulo: "Gato 08",
        imagen: "./assets/img/gato-08.png",
        categoria:{
            nombre: "Personajes",
            id: "personajes",
        },
        precio: 1000
    },
];

// DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.imagen}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}
cargarProductos(productos);
actualizarBotonesAgregar();

botonesCategorias.forEach(boton => {boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
})

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

    