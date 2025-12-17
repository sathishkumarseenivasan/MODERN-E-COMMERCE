// Sample product data with real images
const products = [
    { id: 1, name: "Wireless Headphones", price: 79.99, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", description: "High-quality wireless headphones with noise cancellation" },
    { id: 2, name: "Smart Watch", price: 199.99, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", description: "Feature-rich smartwatch with health tracking" },
    { id: 3, name: "Running Shoes", price: 89.99, category: "sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", description: "Comfortable running shoes for all terrains" },
    { id: 4, name: "Yoga Mat", price: 29.99, category: "sports", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&h=300&fit=crop", description: "Non-slip yoga mat for home workouts" },
    { id: 5, name: "Cotton T-Shirt", price: 24.99, category: "clothing", image: "https://images.unsplash.com/photo-1521572168574-6814b8c2d7e8?w=300&h=300&fit=crop", description: "Soft cotton t-shirt in various colors" },
    { id: 6, name: "Denim Jeans", price: 59.99, category: "clothing", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop", description: "Classic fit denim jeans" },
    { id: 7, name: "Coffee Maker", price: 129.99, category: "home", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop", description: "Automatic coffee maker with timer" },
    { id: 8, name: "Desk Lamp", price: 39.99, category: "home", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop", description: "Modern LED desk lamp with adjustable brightness" },
    { id: 9, name: "Laptop Stand", price: 49.99, category: "electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop", description: "Ergonomic laptop stand for better posture" },
    { id: 10, name: "Water Bottle", price: 19.99, category: "sports", image: "https://images.unsplash.com/photo-1604144492537-1855664c689d?w=300&h=300&fit=crop", description: "Insulated water bottle keeps drinks cold" },
    { id: 11, name: "Throw Pillows", price: 34.99, category: "home", image: "https://images.unsplash.com/photo-1586023492125-6b76a8b0eea1?w=300&h=300&fit=crop", description: "Set of 2 decorative throw pillows" },
    { id: 12, name: "Backpack", price: 44.99, category: "clothing", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", description: "Durable backpack with laptop compartment" }
];

// Shopping cart
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartCount();
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
    
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', openCart);
    
    // Close cart when clicking outside
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCart();
        }
    });
});

// Render products
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    productsToRender.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card rounded-2xl overflow-hidden fade-in luxury-border';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="relative overflow-hidden h-56">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="p-6">
                <h4 class="font-light text-white text-xl mb-3 premium-text">${product.name}</h4>
                <p class="text-gray-400 text-sm mb-6">${product.description}</p>
                <div class="flex items-center justify-between mb-6">
                    <span class="text-3xl font-black text-white premium-text">$${product.price}</span>
                    <div class="flex items-center">
                        <i class="fas fa-star text-white/60 text-sm"></i>
                        <span class="text-gray-400 text-sm ml-2">4.5</span>
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" class="glow-button w-full py-3 rounded-xl font-light premium-text luxury-border">
                    <i class="fas fa-cart-plus mr-3"></i>ADD TO CART
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Product added to cart!');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.add('cart-badge');
    setTimeout(() => cartCount.classList.remove('cart-badge'), 300);
}

// Open cart
function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('hidden');
    renderCart();
}

// Close cart
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('hidden');
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'flex items-center justify-between mb-4 pb-4 border-b';
        cartItem.innerHTML = `
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">$${item.price}</p>
                </div>
            </div>
            <div class="flex items-center">
                <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="mx-3 font-semibold">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="removeFromCart(${item.id})" class="ml-4 text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
            updateCartCount();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartCount();
    showNotification('Product removed from cart');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Simulate checkout process
    showNotification(`Processing order for ${itemCount} items totaling $${total.toFixed(2)}...`);
    
    setTimeout(() => {
        cart = [];
        closeCart();
        updateCartCount();
        showNotification('Order placed successfully! Thank you for your purchase.');
    }, 2000);
}

// Filter by category
function filterByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);
    scrollToProducts();
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
