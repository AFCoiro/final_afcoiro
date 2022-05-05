const pestañaPagos = document.getElementById('pestañaPagos');
/*carga de contenido de la pestaña pagos, acá confirma que va acompra la consola y el pago elegidos en la pestaña anterior y completa sus datos personales para finalizar el proceso.*/
const div3 = document.createElement('div');
           div3.setAttribute('class','classFormPago');
           div3.setAttribute('id','idFormPago');
           div3.innerHTML =  `
           <h1>¡YA FALTA POCO PARA TENER TU ${consolaFinal}!</h1>
           <h2>Completá tus datos personales así te enviamos la orden de pago a tu mail:</h2>
           
           <form id="formPagoFinal" class="formInputGrupo input-group d-flex justify-content-center">
                <div id="divInternoForm">
                      <fieldset disabled>
                            <div class="row g-2">
                                <div class="col-md">
                                <label for="disabledTextInput" class="form-label">Consola</label>
                                <input id="consolaInput" type="text" id="disabledTextInput" class="form-control" placeholder="${consolaFinal}">
                                </div>
                                <div class="col-md">
                                <label for="disabledTextInput" class="form-label">${formaPagoFinal}</label>
                                <input id="pagoInput" type="text" id="disabledTextInput" class="form-control" placeholder="${formaPagoFinal}">
                                </div>
                            </div>
                      </fieldset>

                      <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nombre </label>
                            <input id="nombre" class="form-control" name="nombre" type="text" value="" required='required'  maxlength="15" minlength="3"  aria-describedby="emailHelp">
                      </div>
          
                      <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Apellido </label>
                            <input id="apellido" class="form-control" name="apellido" type="text" value="" required='required' aria-describedby="emailHelp">
                      </div>
          
                      <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email </label>
                            <input id="correo" class="form-control" name="email" type="email" value="" required='required'   aria-describedby="emailHelp">
                      </div>
                      <div class="d-flex justify-content-center">
                      <input id="btnsubmit" class="btnCompra" type="submit" href="#" value="PROCESAR PAGO">
                      </div>
                </div>
           </form>
             `     ;  
               
             pestañaPagos.appendChild(div3);


let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let correo = document.getElementById('correo');

/*creo un array vacio para llenarlo con los datos agregados en el fomulario*/
const arrayClientes = [];
class Clientes {
    constructor(nombre,apellido,correo, consola, pago) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.consola = consola;
        this.pago = pago;
     }
}

/*al igual que la parte anterior, modifico el contenido de la pestaña pago por DOM para simular una "SPA" donde se muestran la confirmacion del pedido con los datos correspondientes*/
let formPagoFinal = document.getElementById("formPagoFinal");
formPagoFinal.addEventListener("submit",validarPago);

// setTimeout(
  function validarPago(e){
    e.preventDefault();
     div3.innerHTML = `
    <h1 class="leyendaPago1" >y...¡LISTO ${nombre.value}! ¡Ya te enviamos la orden de pago!</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producto</th>
          <th scope="col">Medio de pago</th>
          <th scope="col">Total a Pagar</th>
          <th scope="col">Nombre y apellido</th>
          <th scope="col">e-mail</th>
        </tr>
      </thead>
      <tbody>.forma
            <tr>
            <th scope="row">1</th>
            <td class="row">
                <img src="../img/consolas/${imgFinal}" alt="${e.target.consolaInput.placeholder}" class="fotoPago col-6">
                <p class="col-6">${e.target.consolaInput.placeholder}</p>
            </td>
            <td>${pagoFinal}</td>
            <td>${e.target.pagoInput.placeholder}</td>
            <td>${e.target.nombre.value} ${e.target.apellido.value}</td>
            <td>${e.target.email.value}</td>
            </tr>

      </tbody>
    </table>

    <h2 class="leyendaPago2">*Enviamos la orden de pago a ${e.target.email.value}. No te olvides de revisar en la carpeta de publicidades y de spam.</h2>
    `;

    Toastify({
        text: `Orden de pago enviada a \n ${e.target.email.value}`,
        close: true,
        duration: 6000,
        gravity: "top", 
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "rgb(65, 182, 41)",
        },
        
      }).showToast();
    
    

    /*aca lleno el array vacio con los datos completados por el usuario y se muestran por consola y son guardados en localStorage*/
    let clienteJson = new Clientes( e.target.nombre.value, e.target.apellido.value, e.target.email.value,1,2);


    nombreClave= `Usuario ${nombre.value} ${apellido.value}`;

    localStorage.setItem(nombreClave, JSON.stringify(clienteJson));
    arrayClientes.push(clienteJson);

    
    let clienteString = localStorage.getItem(nombreClave);
    arrayClientes.push(JSON.parse(clienteString));
    console.log(clienteString);
    
    nombre.value = "";
    apellido.value = "";
    correo.value = "";

}