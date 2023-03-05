const pintarProductos = (data) => {
    const contenedor = document.getElementById("producto-contenedor");

    data.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML += `<div class="card-image">
                          <img src=${producto.imagen}>
                          <span class="card-title">${producto.nombre}</span>
                          <a class="btn-comprar"><i id=${producto.id} class="fa-solid fa-cart-plus agregar"></i></a>
                        </div>
                        <div class="card-content">
                            <p>${producto.desc}</p>
                            <p>${producto.precio}</p>
                        </div>
                       `
      contenedor.appendChild(div);
    });
  };