let pedido = []
let productos = []
const carrito = document.getElementById('carrito')
const contador= document.getElementById('carrito-contador')

const recuperarProductos = async () => {
    const res = await fetch(`./text/productos.txt`)
    const data = await res.json()
    productos = data
}
recuperarProductos()

const eliminar = (id) => {
    const eliminarId = async () => {
        const res = await fetch(`http://localhost:8080/api/productos/${id}`, {method: 'DELETE'})
        const data = res.json()
        return data
    }
    const response = eliminarId().then(res => res)
    location.reload()
    return response
}

const actualizar = (id, o) => {
    let actuTitle = document.getElementById(`actuTitle${id}`).value
    let actuPrice = document.getElementById(`actuPrice${id}`).value
    let actuThumbnail = document.getElementById(`actuThumbnail${id}`).value
    let obj = {title: actuTitle, price: actuPrice, thumbnail: actuThumbnail}
    const actualizarId = async () => {
        const res = await fetch(`http://localhost:8080/api/productos/${id}`, { method: 'PUT', body: JSON.stringify(obj), headers: {"Content-type": "application/json"} })
        const data = res.json()
        return data
    }
    const response = actualizarId().then(res => res)
    location.reload()
    return response 
}

const carritoAgregarProducto = (ID) => {
    let articuloPedido = pedido.find(el => el.id == ID)
    if (articuloPedido) {
        articuloPedido.cantidad += 1
    } else {
        let {title, price, thumbnail, id} = productos.find( el => el.id == ID)
        pedido.push({id: id, title: title, price: price, cantidad: 1})
    }
    carritoGuardarProducto()    
}

const carritoGuardarProducto = () => {
    carrito.innerHTML = ''
    pedido.forEach( (articulo) => {
        const div = document.createElement('div')
        div.classList.add('articuloPedido')
        div.innerHTML = `
                        <p>Artículo: ${articulo.title}</p>
                        <p>Precio: $${articulo.price * articulo.cantidad}</p>
                        <p>Cantidad: ${articulo.cantidad}</p>
                        <button onclick=eliminarProducto(${articulo.id}) class="btn btn-danger">Eliminar</button>
                    `
        carrito.appendChild(div)
    })
    contador.innerText = pedido.length
    //total.innerText = pedido.reduce( (acc, el) => acc + (el.precio * el.cantidad), 0 )
}

function eliminarProducto(id) {
    let articuloEliminado = pedido.find( el => el.id == id )
    articuloEliminado.cantidad--
    if (articuloEliminado.cantidad == 0) {
        let indice = pedido.indexOf(articuloEliminado)
        pedido.splice(indice, 1)
    }
    carritoGuardarProducto()
}