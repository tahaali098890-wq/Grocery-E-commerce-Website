// Products data
const products = [
    { id: 1, name: "Fresh Apples", price: 3, image: "assets/apples.avif" },
    { id: 2, name: "Organic Bananas", price: 2, image: "assets/bananas.jfif" },
    { id: 3, name: "Fresh Milk", price: 4, image: "assets/milk.jpg" },
    { id: 4, name: "Brown Bread", price: 3, image: "assets/brown bread.jfif" },
    { id: 5, name: "Orange Juice", price: 5, image: "assets/istockphoto-537837754-612x612.jpg" },
    { id: 6, name: "Eggs Pack", price: 4, image: "assets/eggs.webp" }
];

// Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    if(cartCount) cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem){
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(productId){
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    if(typeof renderCart === "function") renderCart();
}

// Change quantity
function changeQuantity(productId, newQty){
    const item = cart.find(i => i.id === productId);
    if(item){
        item.quantity = parseInt(newQty);
        if(item.quantity <= 0) removeFromCart(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        if(typeof renderCart === "function") renderCart();
    }
}

// Render products on homepage/shop page
function renderProducts(){
    const productGrid = document.getElementById("productGrid");
    if(!productGrid) return;
    productGrid.innerHTML = "";
    products.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Initialize
renderProducts();
updateCartCount();
