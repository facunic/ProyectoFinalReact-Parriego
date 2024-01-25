document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products-container');
    const sortDropdown = document.getElementById('sortDropdown');

    let allProducts = []; 

    fetch("../data/products.json")
        .then(res => res.json())
        .then(data => {
            allProducts = data; 

            renderProducts(allProducts);

            sortDropdown.addEventListener('change', function () {
                const sortOrder = this.value;

                const sortedProducts = sortProducts(allProducts, sortOrder);

                renderProducts(sortedProducts);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function sortProducts(products, sortOrder) {
        const sortedProducts = [...products]; 

        if (sortOrder === 'az') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'za') {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        return sortedProducts;
    }

    function renderProducts(products) {
        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <div>
                    <span>$ ${product.price}</span>
                    <button class="add-to-cart" data-id="${product.id}"><i class='bx bxs-cart-add'></i></button>
                </div>
            `;

            productsContainer.appendChild(productCard);

            const addToCartButton = productCard.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', function () {
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        cart.push(product);
    
        localStorage.setItem('cart', JSON.stringify(cart));
    
        Swal.fire({
            icon: 'success',
            title: 'Product added to cart',
            showConfirmButton: false,
            timer: 1000,
        });
    }
});
