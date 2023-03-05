const productoContenedor = document.getElementById('producto-contenedor')

let carrito = []

// Delegación de eventos
productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProducto(e.target.id)
    }
})

const validarProducto = (productoId) => {
    const seRepite = carrito.some(producto => producto.id == productoId)

    if (seRepite) {
        const producto = carrito.find(producto => producto.id == productoId)
        producto.cantidad++
        const cantidad = document.getElementById(`cantidad${producto.id}`)
        cantidad.innerText = `Cantidad: ${producto.cantidad}`
        actTot(carrito)
    } else {
        const producto = productos.find(producto => producto.id == productoId)
        carrito.push(producto)
        pintarProEnCarro(producto)
        actTot(carrito)
    }
};

const pintarProEnCarro = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor')
    const div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
};

const pintarCarro = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor')

    contenedor.innerHTML = ''

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div)
    });
};

const eliminarProductoCarrito = (productoId) => {
    const index = carrito.findIndex(producto => producto.id == productoId)
    carrito.splice(index, 1)
    pintarCarro(carrito)
    actTot(carrito)
};

const actTot = (carrito) => {
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    const totalCompra = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)

    const contadorCarrito = document.getElementById('contador-carrito')
    const precioTotal = document.getElementById('precioTotal')

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra

    conservarEnStorage(carrito)
};

const conservarEnStorage = (carrito) => {
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
};

const obtenerStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    return carritoStorage
};

if (localStorage.getItem('carrito')) {
    carrito = obtenerStorage()
    pintarCarro(carrito)
    actTot(carrito)
}

