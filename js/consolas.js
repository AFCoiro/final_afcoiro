let tituloConsola = document.querySelector(`#tituloConsola`);
let precioConsola = document.querySelector(`#precioConsola`);
let descripConsola = document.querySelector(`#descripConsola`);
let imgConsola = document.querySelector(`#imgConsola`);
let msjPago = document.getElementById('msjPago');
let formPago = document.getElementById('formPago');
let pagoCuota=0;
let pagoFinal=0;
let consolaFinal=0;
let imgFinal=0;
let formaPagoFinal=0;
let i;
let URLactual = window.location.href;
let URLorigin = window.location.origin;

/*fetch para redireccionar y completar la pestaña consolas.html*/

// fetch('../data.json')
//   .then( (resp)=> resp.json())
//   .then((data)=>{
  async function hacerTodo(){
    let far = await fetch("../data.json");
    const data = await far.json();
/*if para capturar el url, y dependiendo el html al que va mediante windor.location, devuelve un valor i*/
if(URLactual==`${URLorigin}/pag/consola1.html`){
  i= 0;
}else if(URLactual==`${URLorigin}/pag/consola2.html`){
  i=1;
}else if(URLactual==`${URLorigin}/pag/consola3.html`){
  i=2;
}else if(URLactual==`${URLorigin}/pag/consola4.html`){
  i=3;
}else if(URLactual==`${URLorigin}/pag/consola5.html`){
  i=4;
}else if(URLactual==`${URLorigin}/pag/consola6.html`){append
  i=5;
}else if(URLactual==`${URLorigin}/pag/consola7.html`){
  i=6;
}else if(URLactual==`${URLorigin}/pag/consola8.html`){
  /**sweet alert para retornar ak index porque la página no está disponible */
  swal({
    title: "¡Disculpá!¡Página en progreso!",
    text: "Todavía nos falta un poquito para tener disponibles los nuevos modelos de PC-ras",
    icon: "warning",
    buttons: "Volver",
  }).then(function() {
    window.location = `${URLorigin}/index.html`;
});
}
/*con ese valor i, dependiendo donde se redireccionó, se completa el html con la consola correspondiente */

tituloConsola.innerText = `${data[i].titulo}`;
precioConsola.innerText = data[i].precio;
descripConsola.innerText = data[i].descripcion;
  imgConsola.innerHTML = `
     <div class="carousel-item active">
       <img src="../img/consolas/${data[i].imagen}" class="d-block w-100" alt="${data[i].consola}">
     </div>
     <div class="carousel-item">
       <img src="../img/consolas/${data[i].imagen1}" class="d-block w-100" alt="${data[i].consola}">
     </div>
     <div class="carousel-item">
       <img src="../img/consolas/${data[i].imagen2}" class="d-block w-100" alt="${data[i].consola}">
     </div>
     `;
     /**Esta función es para determinar las formas de pago que el usuario selecciona. Dependiendo de eso, el valor del producto cambia y se muestra una leyenda con los montos correspondientes */
     function funMsjPago() {    
      if(formPago.value == 1) { 
        precioConsola.innerText=`$${data[i].precio * 0.8}`;
        msjPago.innerText = `¡Te descontamos el 20%! Vas a pagar $${data[i].precio * 0.8}`;
        return pagoFinal = `$${data[i].precio * 0.8}`,consolaFinal=`${data[i].titulo}`,imgFinal =data[i].imagen,formaPagoFinal=`Al Contado`;
      }   
      else if(formPago.value==2) { 
        precioConsola.innerText=`$${data[i].precio}`;
        msjPago.innerText = `Vas a pagar el valor original de $${data[i].precio}`;
        return pagoFinal = `$${data[i].precio}`,consolaFinal=`${data[i].titulo}`,imgFinal =data[i].imagen,formaPagoFinal=`Débito/crédito en 1 cuota`;
      }   
      else if(formPago.value==3) {
        precioConsola.innerText=`$${data[i].precio}`;
        pagoCuota = data[i].precio/3;
        msjPago.innerText = `Vas a pagar $${data[i].precio} en 3 cuotas de $${pagoCuota.toFixed(2)}`;  
        return pagoFinal=`$${data[i].precio} en 3 cuotas de $${pagoCuota.toFixed(2)}`,consolaFinal=`${data[i].titulo}`,imgFinal =data[i].imagen,formaPagoFinal=`3 cuotas sin interés`;
      }   
      else if(formPago.value==4) { 
        precioConsola.innerText=`$${data[i].precio}`;
        pagoCuota = data[i].precio/6;
        msjPago.innerText = `Vas a pagar $${data[i].precio} en 6 cuotas de $${pagoCuota.toFixed(2)}`;  
        return pagoFinal=`$${data[i].precio} en 6 cuotas de $${pagoCuota.toFixed(2)}`,consolaFinal=`${data[i].titulo}`,imgFinal =data[i].imagen,formaPagoFinal=`3 cuotas sin interés`;    
      }
      else if(formPago.value==5) { 
        precioConsola.innerText=`$${data[i].precio+data[i].precio*0.10}`;
        pagoCuota = ( data[i].precio+ (data[i].precio*0.10) )/12;
        msjPago.innerText = `Vas a pagar en 12 cuotas de $${pagoCuota.toFixed(2)}. Total final: $${data[i].precio+data[i].precio*0.10}`; 
        return pagoFinal =`$${data[i].precio*0.10} en 12 cuotas de $${pagoCuota.toFixed(2)}`,consolaFinal=`${data[i].titulo}`,imgFinal =data[i].imagen,formaPagoFinal=`12 cuotas con 10% de interés`;
      }   
    }
    formPago.addEventListener('change',funMsjPago);

/**funcion con submit para redireccionar a la pestaña de confirmar pago. Si no se seleccionó ninguna opción, muestra un alert. */
    let formulario = document.querySelector("#formulario");
formulario.addEventListener("submit",validarPago);

function validarPago(e){
  e.preventDefault();
  if(formPago.value!=1 && formPago.value!=2 && formPago.value!=3 && formPago.value!=4 && formPago.value!=5){
      swal({
          title: "¡Ups!¡Te faltó algo!",
          text: "No seleccionaste producto o forma de pago.",
          icon: "error",
          buttons: false,
          timer: 4000,
          dangerMode: true,
        });
  }else{
 console.log(pagoFinal,
    consolaFinal,
    imgFinal,
    formaPagoFinal);
//  intenté varias formas para que de acá me mande la la parte de pagos, incluyendo integrar todo lo de pagos.js acá adentro.El console log lo deje para corroborar que si me devuelve los valores que me iban a servir para completar la pestaña de pagos, pero evidentemente estoy haciendo algo mal y se que el valor dá cero en el pagos.html porque estan dentro del fetch y las demas funciones estan por fuera. Para poder acceder a lo que ubiese sido acceder al pago, deje el carrito de compras con el href q va a pagos.html
  }
}
  };/*cierre del  (data)*/
hacerTodo();
