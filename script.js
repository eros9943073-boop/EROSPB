// ================================
// DADOS DOS PRODUTOS
// ================================
const products = [
    {
        id: 1,
        name: "Camisa Manchester United",
        category: "camisas",
        price: 299.90,
        oldPrice: 399.90,
        rating: 4.8,
        reviews: 245,
        badge: "promocao",
        description: "Camisa oficial Manchester United 2025/2026 com tecnologia Aeroswift."
    },
    {
        id: 2,
        name: "Tênis Nike Air Max 90",
        category: "tenis",
        price: 549.90,
        oldPrice: 699.90,
        rating: 4.9,
        reviews: 512,
        badge: "promocao",
        description: "Tênis clássico Nike Air Max com conforto premium e tecnologia Air."
    },
    {
        id: 3,
        name: "Chuteira Adidas Predator",
        category: "chuteiras",
        price: 699.90,
        oldPrice: 899.90,
        rating: 4.7,
        reviews: 189,
        badge: "bestseller",
        description: "Chuteira profissional Adidas Predator com controle de bola aprimorado."
    },
    {
        id: 4,
        name: "Moleton Puma Essentials",
        category: "moletons",
        price: 199.90,
        oldPrice: 299.90,
        rating: 4.6,
        reviews: 378,
        badge: "promocao",
        description: "Moleton confortável Puma com tecnologia anti-suor."
    },
    {
        id: 5,
        name: "Short Adidas Clássico",
        category: "shorts",
        price: 129.90,
        oldPrice: 179.90,
        rating: 4.5,
        reviews: 156,
        badge: "promocao",
        description: "Short esportivo Adidas com ajuste perfeito e tecido respirável."
    },
    {
        id: 6,
        name: "Jaqueta Nike Sportswear",
        category: "jaquetas",
        price: 449.90,
        oldPrice: 599.90,
        rating: 4.8,
        reviews: 234,
        badge: "novo",
        description: "Jaqueta de treino Nike com tecnologia therma-fit."
    },
    {
        id: 7,
        name: "Camisa Flamengo",
        category: "camisas",
        price: 289.90,
        oldPrice: 389.90,
        rating: 4.7,
        reviews: 421,
        badge: "bestseller",
        description: "Camisa oficial do Flamengo com tecnologia de compressão."
    },
    {
        id: 8,
        name: "Tênis Adidas Ultraboost",
        category: "tenis",
        price: 599.90,
        oldPrice: 799.90,
        rating: 4.9,
        reviews: 678,
        badge: "bestseller",
        description: "Tênis de performance máxima com boost technology."
    },
    {
        id: 9,
        name: "Chuteira Puma Future",
        category: "chuteiras",
        price: 629.90,
        oldPrice: 799.90,
        rating: 4.6,
        reviews: 142,
        badge: "novo",
        description: "Chuteira Puma com tecnologia neuFit para ajuste perfeito."
    },
    {
        id: 10,
        name: "Boné New Era Yankees",
        category: "acessorios",
        price: 119.90,
        oldPrice: 159.90,
        rating: 4.4,
        reviews: 89,
        badge: "promocao",
        description: "Boné clássico New Era com ajuste fit."
    },
    {
        id: 11,
        name: "Mochila Nike Sportswear",
        category: "acessorios",
        price: 279.90,
        oldPrice: 379.90,
        rating: 4.7,
        reviews: 267,
        badge: "promocao",
        description: "Mochila resistente Nike com compartimento para notebook."
    },
    {
        id: 12,
        name: "Legging Adidas Tight",
        category: "roupas",
        price: 199.90,
        oldPrice: 279.90,
        rating: 4.6,
        reviews: 334,
        badge: "novo",
        description: "Legging de compressão Adidas com tecnologia climalite."
    },
    {
        id: 13,
        name: "Camisa Liverpool",
        category: "camisas",
        price: 299.90,
        oldPrice: 399.90,
        rating: 4.8,
        reviews: 312,
        badge: "bestseller",
        description: "Camisa oficial Liverpool com tecnologia Dri-Fit."
    },
    {
        id: 14,
        name: "Tênis Puma RS-X",
        category: "tenis",
        price: 459.90,
        oldPrice: 599.90,
        rating: 4.5,
        reviews: 198,
        badge: "promocao",
        description: "Tênis retro moderno Puma com design inovador."
    },
    {
        id: 15,
        name: "Chuteira Nike Phantom",
        category: "chuteiras",
        price: 749.90,
        oldPrice: 949.90,
        rating: 4.9,
        reviews: 267,
        badge: "bestseller",
        description: "Chuteira profissional Nike com sensibilidade máxima."
    }
];

// ================================
// CARRINHOS E FAVORITOS
// ================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentFilter = 'all';
let currentModalProduct = null;

// ================================
// INICIALIZAÇÃO
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    updateCartCount();
    updateFavoritesDisplay();
    setupEventListeners();
    startBannerSlider();
}

// ================================
// SETUP DE EVENTOS
// ================================
function setupEventListeners() {
    // Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderProducts();
        });
    });

    // Category Cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            const filterBtn = document.querySelector(`[data-filter="${category}"]`);
            if (filterBtn) {
                filterBtn.classList.add('active');
                currentFilter = category;
            } else {
                document.querySelector('[data-filter="all"]').classList.add('active');
                currentFilter = 'all';
            }
            renderProducts();
            window.scrollTo({ top: 800, behavior: 'smooth' });
        });
    });

    // Cart Icon
    document.querySelector('.cart-icon').addEventListener('click', toggleCartSidebar);

    // User Login
    document.querySelector('.user-login').addEventListener('click', () => {
        openModal('loginModal');
    });

    // Favorites Icon
    document.querySelector('.favorites-icon').addEventListener('click', () => {
        showNotification(`Você tem ${favorites.length} produtos favoritos!`);
    });

    // Modal Close Buttons
    document.querySelectorAll('.modal-close, .cart-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal') || e.target.closest('.cart-sidebar');
            closeModal(modal);
        });
    });

    // Login Tabs
    document.querySelectorAll('.login-tab').forEach(tab => {
        tab.addEventListener('click', switchLoginTab);
    });

    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletter);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

    // Checkout Button
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);

    // Quantity Controls in Modal
    document.getElementById('qtyPlus').addEventListener('click', () => {
        const input = document.getElementById('qtyInput');
        if (input.value < 10) input.value++;
    });

    document.getElementById('qtyMinus').addEventListener('click', () => {
        const input = document.getElementById('qtyInput');
        if (input.value > 1) input.value--;
    });

    // Modal Add to Cart
    document.getElementById('modalAddCart').addEventListener('click', addProductToCart);

    // Continue Shopping Button
    document.querySelector('.cart-footer .btn-secondary').addEventListener('click', () => {
        const cartSidebar = document.getElementById('cartSidebar');
        cartSidebar.classList.remove('active');
    });

    // Close Modals on Background Click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

// ================================
// RENDERIZAÇÃO DE PRODUTOS
// ================================
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const bestsellersGrid = document.getElementById('bestsellersGrid');
    
    let filteredProducts = products;

    if (currentFilter !== 'all') {
        if (currentFilter === 'promocao') {
            filteredProducts = products.filter(p => p.badge === 'promocao');
        } else if (currentFilter === 'novidade') {
            filteredProducts = products.filter(p => p.badge === 'novo');
        } else if (currentFilter === 'bestseller') {
            filteredProducts = products.filter(p => p.badge === 'bestseller');
        } else {
            filteredProducts = products.filter(p => p.category === currentFilter);
        }
    }

    const bestSellers = products.filter(p => p.badge === 'bestseller');

    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    bestsellersGrid.innerHTML = bestSellers.slice(0, 8).map(product => createProductCard(product)).join('');

    attachProductListeners();
}

function createProductCard(product) {
    const isFavorite = favorites.includes(product.id);
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                ${product.badge ? `<div class="product-badge ${product.badge === 'promocao' ? '' : product.badge === 'novo' ? 'new' : 'bestseller'}">${
                    product.badge === 'promocao' ? `DESCONTO ${discount}%` :
                    product.badge === 'novo' ? 'NOVO' :
                    'BEST SELLER'
                }</div>` : ''}
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-product-id="${product.id}">♡</button>
                <div style="font-size: 80px; opacity: 0.8;">
                    ${product.category === 'camisas' ? '👕' :
                    product.category === 'tenis' ? '👟' :
                    product.category === 'chuteiras' ? '⚽' :
                    product.category === 'moletons' ? '🧥' :
                    product.category === 'shorts' ? '🩳' :
                    product.category === 'jaquetas' ? '🧤' :
                    product.category === 'roupas' ? '🏃' :
                    '🎽'}
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>` : ''}
                    <span class="new-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" data-product-id="${product.id}">Comprar</button>
                    <button class="quick-view" data-product-id="${product.id}">Detalhes</button>
                </div>
            </div>
        </div>
    `;
}

function attachProductListeners() {
    // Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            const product = products.find(p => p.id === productId);
            addToCart(product, 1);
        });
    });

    // Quick View
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            openProductModal(productId);
        });
    });

    // Favorites
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            toggleFavorite(productId);
            e.stopPropagation();
        });
    });
}

// ================================
// CARRINHO
// ================================
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

function addProductToCart() {
    const quantity = parseInt(document.getElementById('qtyInput').value);
    addToCart(currentModalProduct, quantity);
    closeModal(document.getElementById('productModal'));
    document.getElementById('qtyInput').value = '1';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('Produto removido do carrinho!');
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart();
        updateCartDisplay();
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                <p style="font-size: 30px; margin-bottom: 10px;">🛒</p>
                <p>Seu carrinho está vazio!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${item.category === 'camisas' ? '👕' :
                item.category === 'tenis' ? '👟' :
                item.category === 'chuteiras' ? '⚽' :
                item.category === 'moletons' ? '🧥' :
                item.category === 'shorts' ? '🩳' :
                item.category === 'jaquetas' ? '🧤' :
                item.category === 'roupas' ? '🏃' :
                '🎽'}
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span style="width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    updateCartTotal();
    updateSummary();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function toggleCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ================================
// FAVORITOS
// ================================
function toggleFavorite(productId) {
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        showNotification('Removido dos favoritos!');
    } else {
        favorites.push(productId);
        showNotification('Adicionado aos favoritos!');
    }

    saveFavorites();
    updateFavoritesDisplay();
    renderProducts();
}

function updateFavoritesDisplay() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (favorites.includes(productId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ================================
// MODAIS
// ================================
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    currentModalProduct = product;

    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalRating').textContent = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    document.getElementById('modalReviews').textContent = `(${product.reviews} avaliações)`;
    document.getElementById('modalOldPrice').textContent = product.oldPrice ? `R$ ${product.oldPrice.toFixed(2).replace('.', ',')}` : '';
    document.getElementById('modalNewPrice').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('qtyInput').value = '1';

    openModal('productModal');
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ================================
// BUSCA E FILTROS
// ================================
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const productsGrid = document.getElementById('productsGrid');

    if (searchTerm === '') {
        renderProducts();
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    productsGrid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    attachProductListeners();
}

// ================================
// BANNER SLIDER
// ================================
function startBannerSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.slider-dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// ================================
// FORMULÁRIOS
// ================================
function switchLoginTab(e) {
    const tabName = e.target.dataset.tab;
    
    document.querySelectorAll('.login-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');

    document.querySelectorAll('.login-form, .register-form').forEach(form => {
        form.classList.remove('active');
    });

    if (tabName === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    showNotification(`Bem-vindo de volta! Login com ${email}`);
    closeModal(document.getElementById('loginModal'));
    e.target.reset();
}

function handleRegister(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    
    showNotification(`Conta criada com sucesso! Bem-vindo, ${name}!`);
    closeModal(document.getElementById('loginModal'));
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    showNotification(`Inscrição confirmada para ${email}!`);
    e.target.reset();
}

// ================================
// CHECKOUT
// ================================
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio!');
        return;
    }

    document.getElementById('checkoutPage').classList.add('active');
    document.getElementById('cartSidebar').classList.remove('active');
    document.body.style.overflow = 'hidden';
    updateSummary();
    window.scrollTo(0, 0);
}

function closeCheckout() {
    document.getElementById('checkoutPage').classList.remove('active');
    document.body.style.overflow = '';
}

function updateSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryTotal = document.getElementById('summaryTotal');

    let subtotal = 0;
    let totalDiscount = 0;

    summaryItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        const discount = item.oldPrice ? ((item.oldPrice - item.price) * item.quantity) : 0;
        subtotal += itemTotal;
        totalDiscount += discount;

        return `
            <div class="summary-item">
                <span class="summary-item-name">${item.name} x${item.quantity}</span>
                <span class="summary-item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
    }).join('');

    summarySubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    summaryDiscount.textContent = `- R$ ${totalDiscount.toFixed(2).replace('.', ',')}`;

    const shipping = 15;
    const total = subtotal - totalDiscount + shipping;
    summaryTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function handleCheckout(e) {
    e.preventDefault();

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const name = e.target.querySelector('input[type="text"]').value;

    showNotification('Pedido processado com sucesso!');
    
    setTimeout(() => {
        showCheckoutConfirmation(paymentMethod, name);
    }, 500);

    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function showCheckoutConfirmation(paymentMethod, name) {
    const checkoutPage = document.getElementById('checkoutPage');
    const originalContent = checkoutPage.innerHTML;

    const confirmationHTML = `
        <div class="container" style="text-align: center; padding: 100px 20px;">
            <div style="max-width: 500px; margin: 0 auto;">
                <div style="font-size: 80px; margin-bottom: 20px; animation: bounce 0.6s ease;">✓</div>
                <h2 style="font-size: 32px; margin-bottom: 15px; color: var(--primary-color);">PEDIDO CONFIRMADO!</h2>
                <p style="font-size: 16px; color: var(--text-secondary); margin-bottom: 30px;">
                    Obrigado por sua compra, ${name}!
                </p>
                <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; margin-bottom: 30px; text-align: left;">
                    <p style="margin-bottom: 10px;"><strong>Número do Pedido:</strong> #SPH-${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p style="margin-bottom: 10px;"><strong>Forma de Pagamento:</strong> ${
                        paymentMethod === 'pix' ? 'PIX' :
                        paymentMethod === 'credit' ? 'Cartão de Crédito' :
                        'Boleto'
                    }</p>
                    <p style="margin-bottom: 10px;"><strong>Status:</strong> <span style="color: var(--primary-color);">✓ Confirmado</span></p>
                    <p><strong>Entrega Estimada:</strong> 7-10 dias úteis</p>
                </div>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-right: 10px;">Continuar Comprando</button>
                <button onclick="downloadInvoice()" class="btn btn-secondary">Baixar Recibo</button>
            </div>
        </div>
    `;

    checkoutPage.innerHTML = confirmationHTML;
}

function downloadInvoice() {
    showNotification('Recibo enviado para seu email!');
}

// ================================
// NOTIFICAÇÕES
// ================================
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    notificationText.textContent = message;
    notification.classList.add('active');

    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// ================================
// HEADER FIXO
// ================================
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-lg)';
    } else {
        header.style.boxShadow = 'var(--shadow-md)';
    }
});

// ================================
// FECHAR CHECKOUT
// ================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const checkoutPage = document.getElementById('checkoutPage');
        const cartSidebar = document.getElementById('cartSidebar');
        
        if (checkoutPage.classList.contains('active')) {
            closeCheckout();
        }
        if (cartSidebar.classList.contains('active')) {
            cartSidebar.classList.remove('active');
        }
    }
});
