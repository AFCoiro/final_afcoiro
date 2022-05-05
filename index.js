const linkDiv = document.querySelector('#linkDiv');

let cajaDom = document.getElementsByClassName('cajaDom');

let linksDom = document.querySelectorAll('.linksDom');


   async function pedirPost(){
   let varFetch = await fetch('/data.json')
   const data = await varFetch.json(); 
   data.forEach( producto => {
  

  const div1 = document.createElement('div')
          div1.setAttribute('class','card linksDom')
          div1.setAttribute('id',`${producto.id}`)
          div1.innerHTML =       `
          <a href="pag/consola${producto.id}.html" class="aLink">
          <img src="../img/consolas/${producto.imagen}" class="card-img-top" alt="${producto.consola}">
          <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text">$${producto.precio}</p>
            
          </div>
          </a>
            ` ;      

            linkDiv.append(div1);

          }
      )

  }
  pedirPost();