
let productosEnCarrito = localStorage.getItem("productos-en-carrito"); productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll("#carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach( producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}" ><i class="bi bi-x-circle-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        });
        actualizarBotonesEliminar();
        actualizarTotal();
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoDelCarrito);
    })
}


function eliminarProductoDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1){
        if(productosEnCarrito[index].cantidad > 1){
            productosEnCarrito[index].cantidad -= 1;
        }else{
            productosEnCarrito.splice(index, 1);
        }
    }
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

let carrito = [];

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    Swal.fire({
        title: "<h4 class='titulo-alerta-compra'>¿Desea realizar esta compra?</h4>",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#4f8ee8",
        confirmButtonText: "Pagar ahora",
        confirmButtonColor: "#faa470",
        icon: "question",
        backdrop: true,

    }).then((result) => {
        if (result.isConfirmed){
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            Swal.fire({
                html: "<p class='texto-alerta-compra'>El pago se ha realizado con éxito :)</p>",
                confirmButtonText: "Genial",
                confirmButtonColor: "#faa470",
                icon: "success",
                backdrop: true,
            });

            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
        }else if(result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                html: "<p class='texto-alerta-compra'>La compra se ha cancelado :(</p>",
                confirmButtonText: "Ok",
                confirmButtonColor: "#faa470",
                icon: "error",
                backdrop: true,
            });
        }
    });
}









