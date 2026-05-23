let allProducts = [];

async function fetchProducts() {

    const response = await fetch('/products');

    const products = await response.json();

    allProducts = products;

    displayProducts(products);
}

function displayProducts(products) {

    const productsDiv =
        document.getElementById('products');

    productsDiv.innerHTML = '';

    products.forEach((product, index) => {

        productsDiv.innerHTML += `
        
        <div class="card">

            <img src="${product.image}">

            <h2>${product.name}</h2>

            <p>$${product.price}</p>

            <a href="product.html?id=${product._id}">
                <button>
                    View Details
                </button>
            </a>

            <button
                onclick='addToCart(${JSON.stringify(product)})'
            >
                Add To Cart
            </button>
            <button
    onclick='addToWishlist(${JSON.stringify(product)})'
>
    ❤️ Wishlist
</button>
        </div>
        `;
    });
}

document
.getElementById('searchInput')

.addEventListener('input', (e) => {

    const search =
        e.target.value.toLowerCase();

    const filteredProducts =
        allProducts.filter(product =>

        product.name
        .toLowerCase()
        .includes(search)
    );

    displayProducts(filteredProducts);
});

function addToCart(product) {

    let cart =
        JSON.parse(localStorage.getItem('cart'))
        || [];

    cart.push(product);

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );

    showMessage("Added To Cart");
}

fetchProducts();
function showMessage(text) {

    const message =
        document.createElement('div');

    message.innerText = text;

    message.className = 'toast';

    document.body.appendChild(message);

    setTimeout(() => {

        message.remove();

    }, 2000);
}
function addToWishlist(product) {

    let wishlist =
        JSON.parse(localStorage.getItem('wishlist'))
        || [];

    wishlist.push(product);

    localStorage.setItem(
        'wishlist',
        JSON.stringify(wishlist)
    );

    showMessage("Added To Wishlist");
}
function buyNow() {

    let cart = [];

    cart.push(product);

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );

    window.location.href = 'payment.html';
}