
const productos = [
    {
        id: "cafeteria",
        titulo: "Cafeteria",
        imagen: "./assets/img/bkry-orth-1.png",
        categoria:{
            nombre: "Estructuras",
            id: "estructuras"
        },
        precio: 5000
    },
    {
        id: "planeta-goose",
        titulo: "PLaneta Goose",
        imagen: "./assets/img/goose-avatar-1.png",
        categoria:{
            nombre: "Mapas",
            id: "mapas"
        },
        precio: 10000
    },
    {
        id: "gato-02",
        titulo: "Gato 02",
        imagen: "./assets/img/gato-02.png",
        categoria:{
            nombre: "Personajes",
            id: "personajes"
        },
        precio: 1000
    },
    {
        id: "gato-08",
        titulo: "Gato 08",
        imagen: "./assets/img/gato-08.png",
        categoria:{
            nombre: "Peronajes",
            id: "personajes"
        },
        precio: 1000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");

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
                <button class="producto-agregar" id=${producto.id}>Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productos);
    })
})







/*
    <img class="producto-imagen" src="./assets/img/bkry-orth-1.png" alt="Una cafetería">
        <div class="producto-detalles">
        <h3 class="producto-titulo">Cafetería</h3>
        <p class="producto-precio">$5.000</p>
        <button class="producto-agregar">Agregar</button>
    </div>
*/






















// * * * *  pre entrega 2  * * * *

// function calculoCuotas() {
//     let ingresarNombre;
//     let ingresarApellido;
//     let carrito = {};

//     while (true) {
//         ingresarNombre = prompt("Ingrese su nombre");
//         if (ingresarNombre === "") {
//             alert("Error: Ingrese su nombre");
//         } else {
//             ingresarApellido = prompt("Ingrese su apellido");
//             if (ingresarApellido === "") {
//                 alert("Error: Ingrese su apellido");
//             } else {
//                 alert("Bienvenido/a " + ingresarNombre + " " + ingresarApellido);

//                 const productos = {
//                     "camiseta": 100,
//                     "pantalon": 150,
//                     "chaqueta": 200,
//                 };

//                 let agregarOtraOperacion = true;

//                 while (agregarOtraOperacion) {
//                     let productosTexto = "Productos disponibles:\n";
//                     for (const producto in productos) {
//                         productosTexto += `${producto}: $${productos[producto]}\n`;
//                     }
//                     alert(productosTexto);

//                     let agregarOtroProducto = true;

//                     while (agregarOtroProducto) {
//                         const productoElegido = prompt("Ingrese el nombre del producto").toLowerCase();

//                         if (productoElegido in productos) {
//                             const cantidad = parseInt(prompt("Ingrese la cantidad"));

//                             if (!isNaN(cantidad) && cantidad > 0) {
                                
//                                 if (carrito[productoElegido]) {
//                                     carrito[productoElegido] += cantidad;
//                                 } else {
//                                     carrito[productoElegido] = cantidad;
//                                 }
//                                 alert(`Producto ${productoElegido} agregado al carrito.`);
//                             } else {
//                                 alert("Error: Cantidad inválida");
//                             }
//                         } else {
//                             alert("Error: Producto no encontrado");
//                         }

//                         agregarOtroProducto = confirm("¿Desea agregar otro producto?");
//                     }

                    
//                     let precioTotal = 0;
//                     let detalleProductos = "Detalle de productos:\n";
//                     for (const producto in carrito) {
//                         const productoLowerCase = producto.toLowerCase();
//                         if (productoLowerCase in productos) {
//                             const cantidad = carrito[producto];
//                             const precioUnitario = productos[productoLowerCase];
//                             const precioProducto = cantidad * precioUnitario;
//                             detalleProductos += `${cantidad} ${producto}: $${precioProducto}\n`;
//                             precioTotal += precioProducto;
//                         }
//                     }
//                     alert(`Precio total a pagar: $${precioTotal}\n${detalleProductos}`);

//                     let cuotas;

//                     while (true) {
//                         cuotas = parseInt(prompt("Desde 0 a 12 cuotas precio contado"));
//                         if (!isNaN(cuotas) && cuotas >= 0 && cuotas <= 12) {
//                             break; 
//                         }
//                         alert("Error: Ingresa un número entre 0 y 12");
//                     }

//                     let pagoMensual = precioTotal / (cuotas || 1);
//                     alert("Pago mensual del: $" + pagoMensual.toFixed(0));
//                     agregarOtraOperacion = confirm("¿Desea realizar otra operación?");
                    
                    
//                     carrito = {};
//                 }

//                 let continuar = confirm("¿Desea realizar otra operación?");
//                 if (!continuar) {
//                     return;
//                 }
//             }
//         }
//     }
// }

// calculoCuotas();