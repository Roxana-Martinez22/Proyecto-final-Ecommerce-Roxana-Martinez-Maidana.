let car =[];
let price= 0;

const cars= document.querySelectorAll('.car');

cars.forEach( car => {

    const button= car.querySelector ('button');
    const titleProduct= car.querySelector ('h4').textContent;
    const priceProduct= car.querySelector ('p:last-child span').textContent.slice(1);

    button.addEventListener ('click', () => {
        const product= {
            title: titleProduct,
            price: priceProduct,
            count:1,
        };

        console.log(product);
        
        car.push(product);
        totalPrice += parseFloat(product.price);

        localStorage.setItem('productos', JSON.stringify(cart));
        localStorage.setItem('total', totalPrice.toString(2));

        document.querySelector('.count').textContent= car.length;
    });
});

function handleCar() {
    const car=JSON.parse(localStorage.getItem('productos')) || [];
    const total=JSON.parse(localStorage.getItem('total')) ||0;

    const carritoProduct= document.getElementById('itemProducts');

    if(car.length=== 0) {
        carritoProduct.innerHTML= '<p>El carrito está vacío</p>';
        return;
    }

    const tabla= document.createElement('table');

    let encabezado= 
        <thead> 
            <th>
                <td>Nombre del producto</td>
                <td>Precio</td>
                <td>Cantidad</td>
            </th>
        </thead>
    ;
    let cuerpo = '<tbody>';
    car.forEach (producto =>{
        cuerpo += 
        <tr>
            <td>${producto.title}</td>
            <td>$${producto.price}</td>
            <td>${producto.count}</td>
        </tr>
    });
    cuerpo+= '</tbody>';

    tabla.innerHTML= encabezado + cuerpo;

    carritoProduct.appendChild(tabla);
}

function limpiarCarrito() {
   if(confirm ('¿Estás seguro que deseas eliminar el carrito?')){
        car = [];
        totalPrice = 0
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
        location.reload();
   }

}

// Introducir los productos de mi API

async function loadProduct() {
    try {
        const response= await fetch('https://dummyjson.com/products');
        const data= await response.json();
        printProducts (data.products);

    } catch (error) {
        console.log ('Error al cargar el producto', error);
        }
    
}

function printProducts (products){
    const container= document.getElementById ('product-list');

    products.forEach (product => {
        const car = document.createElement ('div');
        car.classList.add ('car');

        car.innerHTML = `
            <h4>${prod.title}</h4>
            <img src="${prod.thumbnail}" alt="${prod.title}">
            <p>${prod.description}</p>
            <p>Precio: <span>$${prod.price}</span></p>
            <button>Añadir</button>
      `;

        container.appendChild(car)
    })
}








document.addEventListener('DOMContentLoaded', handleCar);