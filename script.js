// Premium product data with high-quality images
const products = [
    { id: 1, name: "Wireless Headphones", price: 299.99, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop", description: "Premium noise-cancelling wireless headphones" },
    { id: 2, name: "Minimalist Watch", price: 449.99, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop", description: "Elegant timepiece with Swiss movement" },
    { id: 3, name: "Running Sneakers", price: 189.99, category: "sports", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", description: "Lightweight performance running shoes" },
    { id: 4, name: "Yoga Mat Premium", price: 89.99, category: "sports", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=600&fit=crop", description: "Natural rubber yoga mat with alignment lines" },
    { id: 5, name: "Linen Shirt", price: 129.99, category: "clothing", image: "https://images.unsplash.com/photo-1521572168574-6814b8c2d7e8?w=600&h=600&fit=crop", description: "Breathable linen shirt for everyday wear" },
    { id: 6, name: "Tailored Trousers", price: 199.99, category: "clothing", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop", description: "Modern fit wool blend trousers" },
    { id: 7, name: "Pour-Over Set", price: 89.99, category: "home", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop", description: "Artisan coffee brewing set" },
    { id: 8, name: "Architect Lamp", price: 179.99, category: "home", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop", description: "Mid-century modern desk lamp" },
    { id: 9, name: "Laptop Stand", price: 129.99, category: "electronics", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop", description: "Aluminum adjustable laptop stand" },
    { id: 10, name: "Steel Bottle", price: 45.99, category: "sports", image: "https://images.unsplash.com/photo-1604144492537-1855664c689d?w=600&h=600&fit=crop", description: "Vacuum insulated water bottle" },
    { id: 11, name: "Cashmere Throw", price: 249.99, category: "home", image: "https://images.unsplash.com/photo-1586023492125-6b76a8b0eea1?w=600&h=600&fit=crop", description: "Luxurious cashmere blend throw" },
    { id: 12, name: "Leather Backpack", price: 349.99, category: "clothing", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop", description: "Full-grain leather everyday backpack" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    updateCartCount();
    initScrollAnimations();
    initCursor();
    initHeaderScroll();
    
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
    
    document.getElementById('cartBtn').addEventListener('click', openCart);
});

function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    productsToRender.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-up';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button onclick="addToCart(${product.id})" class="add-to-cart-btn">ADD TO BAG</button>
                </div>
            </div>
            <div class="p-5">
                <h4 class="font-medium text-lg mb-2">${product.name}</h4>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="flex items-center justify-between">
                    <span class="serif-font text-xl font-medium">$${product.price}</span>
                    <div class="flex items-center text-yellow-500 text-sm">
                        <i class="fas fa-star"></i>
                        <span class="text-gray-400 ml-1">4.9</span>
                    </div>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
        
        setTimeout(() => productCard.classList.add('visible'), 50 + (index * 100));
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Added to bag');
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartPanel = document.getElementById('cartPanel');
    cartModal.classList.remove('hidden');
    setTimeout(() => cartPanel.classList.add('cart-panel-open'), 10);
    renderCart();
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.remove('cart-panel-open');
    setTimeout(() => cartModal.classList.add('hidden'), 500);
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="text-center py-12"><p class="text-gray-500 mb-4">Your bag is empty</p><button onclick="closeCart()" class="text-sm underline">Continue Shopping</button></div>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'flex gap-4 mb-6 pb-6 border-b last:border-0';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-sm">
            <div class="flex-1">
                <h4 class="font-medium mb-1">${item.name}</h4>
                <p class="text-gray-500 text-sm mb-3">$${item.price}</p>
                <div class="flex items-center gap-3">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 flex items-center justify-center border hover:bg-gray-50 transition">
                        <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="text-sm font-medium w-4 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 flex items-center justify-center border hover:bg-gray-50 transition">
                        <i class="fas fa-plus text-xs"></i>
                    </button>
                    <button onclick="removeFromCart(${item.id})" class="ml-auto text-gray-400 hover:text-red-500 transition">
                        <i class="fas fa-trash text-sm"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

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

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartCount();
    showNotification('Removed from bag');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your bag is empty');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showNotification(`Processing order...`);
    
    setTimeout(() => {
        cart = [];
        closeCart();
        updateCartCount();
        showNotification('Order confirmed! Thank you.');
    }, 2000);
}

function filterByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-sm shadow-lg z-50 fade-up visible';
    notification.innerHTML = `<span class="text-sm tracking-wide">${message}</span>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .category-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = 'rgba(201, 169, 98, 0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = 'rgba(201, 169, 98, 0.3)';
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('nav-scrolled');
        } else {
            header.classList.remove('nav-scrolled');
        }
    });
}
