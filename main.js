
let ingresarNombre;
let ingresarApellido;

function calculoCuotas(){
    while (true){
        ingresarNombre = prompt("Ingrese su nombre");
        if(ingresarNombre === ""){
            alert("Error: Ingrese su nombre");
        }else{
            while (true){
                ingresarApellido = prompt("Ingrese su apellido");
                if(ingresarApellido === ""){
                    alert("Error: Ingrese su apellido");
                }else{
                    alert("Bienvenido/a " +ingresarNombre + " " +ingresarApellido);
                    
                while(true){
                    let monto = parseFloat(prompt("Ingrese el monto a pagar"));
                    let cuotas = parseInt(prompt("Desde 0 a 12 cuotas precio contado"));
                    if(isNaN(monto) || monto <= 0){
                        alert("Error: Ingrese un monto válido")
                    }else{
                        if(isNaN(cuotas) || cuotas < 0 || cuotas > 12){
                            alert("Error: Ingresa un número entre 0 y 12")
                        }else{
                            let pagoMensual = monto / (cuotas || 1);
                            alert("Monto total a pagar: $" + monto.toFixed(0))
                            alert("Pago mensual del: $" + pagoMensual.toFixed(0))
                            let continuar = confirm("¿Desea realizar otra operación?");
                            if(!continuar){
                                return;
                                }               
                            }
                        }
                    }
                }
            }
        }
    }
}

calculoCuotas();