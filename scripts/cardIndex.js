document.addEventListener('DOMContentLoaded', function () {
  const productsContainer = document.getElementById('products-container');

  var cartData = JSON.parse(localStorage.getItem('cart')) || [];

  fetch("./data/products.json")
    .then(res => res.json())
    .then(data => {
      const filteredProducts = data.filter(product => product.sale > 30);

      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <div>
            <span>$ ${product.price}</span>
            <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product)})"><i class='bx bxs-cart-add'></i></button>
          </div>
        `;

        productsContainer.appendChild(productCard);

        const addToCartButton = productCard.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', function () {
          addToCart(product);
        });
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  function addToCart(product) {
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    cartProducts.push(product);

    localStorage.setItem('cart', JSON.stringify(cartProducts));

    Swal.fire({
      icon: 'success',
      title: 'Product added to cart',
      showConfirmButton: false,
      timer: 1000,
    });
  }
});
