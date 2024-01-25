document.addEventListener('DOMContentLoaded', function () {
    var cartBody = document.getElementById('cartBody');
    var vaciarCarritoBtn = document.getElementById('vaciarCarritoBtn');
    var confirmarCompraBtn = document.getElementById('confirmarCompraBtn');

    actualizarCarritoYTabla();

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    confirmarCompraBtn.addEventListener('click', confirmarCompra);

    actualizarCarritoYTabla();

    function addProductToTable(product) {
        var row = document.createElement('tr');

        var uniqueId = 'product_' + Math.random().toString(36).substr(2, 9);
        row.setAttribute('id', uniqueId);

        row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>${product.sale}%</td>
            <td>
                <button class="eliminar-btn">Eliminar</button>
            </td>
        `;

        cartBody.appendChild(row);

        var eliminarBtn = row.querySelector('.eliminar-btn');
        eliminarBtn.addEventListener('click', function () {
            eliminarProducto(uniqueId, product.title);
        });
    }

    async function eliminarProducto(uniqueId, productName) {
        var cartData = JSON.parse(localStorage.getItem('cart')) || [];
        var rowToRemove = document.getElementById(uniqueId);

        if (rowToRemove) {
            rowToRemove.remove();

            var updatedCart = cartData.filter(function (product) {
                return product.title !== productName;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            await actualizarCarritoYTabla();
        }
    }

    function vaciarCarrito() {
        localStorage.removeItem('cart');
        actualizarCarritoYTabla();
    }

    function confirmarCompra() {
        localStorage.removeItem('cart');
        actualizarCarritoYTabla();

        Swal.fire({
            icon: 'success',
            title: 'Compra confirmada',
            text: 'Gracias por tu compra. Los productos han sido eliminados del carrito.',
            showConfirmButton: false,
            timer: 2000,
        });
    }

    function actualizarCarritoYTabla() {
        var updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cartBody.innerHTML = '';

        updatedCart.forEach(function (product) {
            addProductToTable(product);
        });
    }
});
