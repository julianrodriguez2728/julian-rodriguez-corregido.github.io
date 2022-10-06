const cartas = document.getElementById("cartas");
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("items");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const precioTotal = document.getElementById("precio");
let carrito = []
let compra = []

document.addEventListener("DOMContentLoaded" , () =>{
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})



vaciarCarrito.addEventListener("click", ()=>{
    carrito.length = 0;
    actualizarCarrito();
    
})


stockProductos.forEach((productos) =>{
    const div =document.createElement("div")
    div.classList.add("producto")
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${productos.imagen}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${productos.titulo}</h5>
    <button type="" id="agregar${productos.id}" class="btn btn-warning">AgregarAlCarro</button>
  </div>
</div>
     `
     cartas.appendChild(div)
     const boton =  document.getElementById(`agregar${productos.id}`);

     boton.addEventListener("click", ()=>{
        AgregarAlCarro(productos.id)
     })
})

const AgregarAlCarro = (prodId)=>{
    const exis= carrito.some(prod => prod.id===prodId)
    if (exis){
        const prod = carrito.map (prod =>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }else{

        const item = stockProductos.find((prod) =>  prod.id === prodId)
        carrito.push(item);
        Swal.fire(
            'Agregaste producto al carro!',
            'producto: '+ prodId,
            'success'
            )
        
    }
        actualizarCarrito()
}

const Eliminardelcarrito =(prodId) =>{
    const item = carrito.find((prod)=> prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
    
}

const actualizarCarrito = () =>{
    contenedorCarrito.innerHTML=""
    carrito.forEach((prod)=>{
        const div = document.createElement("tr");
        div.className = ("productosAgregados");
        div.innerHTML= `
        <tr>
        <th scope="col">${prod.id}</th>
        <th scope="col">${prod.titulo}</th>
        <th scope="col"><span id="cantidad">${prod.cantidad}</span></th>
        <th scope="col">$${prod.precio}</th>
        
        <button onclick="Eliminardelcarrito(${prod.id})" class="boton-eliminar"><img src="./img/basurero.png" class="basurero"></button>
        </tr>
        `
        contenedorCarrito.appendChild(div);

        localStorage.setItem("carrito",JSON.stringify(carrito))
    })
    precioTotal.innerText= carrito.reduce((acc, prod)=> acc + prod.precio, 0);
}

