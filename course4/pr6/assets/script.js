const products = [
    {
        id: 1,
        name: "Apple iPhone 15",
        price: 38000,
        image: "https://www.mediaexpert.pl/media/cache/gallery/images/58/5860220/Smartfon-APPLE-iPhone-15-128GB-5G-6-1-Czarny-front-tyl-3.jpg"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 35000,
        image: "https://www.mediaexpert.pl/media/cache/gallery/images/61/6180562/Smartfon-SAMSUNG-Galaxy-S24-Ultra-Czarny-logotyp.jpg"
    },
    {
        id: 3,
        name: "Xiaomi 14",
        price: 28000,
        image: "https://www.mediaexpert.pl/media/cache/gallery/images/63/6369602/Smartfon-XIAOMI-14-5G-Czarny-front-tyl.jpg"
    },
    {
        id: 4,
        name: "Google Pixel 8",
        price: 31000,
        image: "https://www.mediaexpert.pl/media/cache/gallery/images/60/6004144/Smartfon-GOOGLE-Pixel-8-5G-AI-1.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let tempProductToAdd = null;

window.onload = () => {
    renderProducts();
    updateCartCounter();
};

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <div class="price">${product.price} грн</div>
            <button class="btn btn-primary" onclick="openQtyModal(${product.id})">Додати у корзину</button>
        </div>
    `).join('');
}

function handleCartClick() {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        showCart();
    }
}

function updateCartCounter() {
    document.getElementById('cart-counter').innerText = cart.length;
}

function openQtyModal(id) {
    tempProductToAdd = products.find(p => p.id === id);
    document.getElementById('qty-input').value = 1;
    document.getElementById('modal-qty').classList.remove('hidden');
}

document.getElementById('confirm-add-btn').onclick = () => {
    const qty = parseInt(document.getElementById('qty-input').value);

    if (qty > 0 && tempProductToAdd) {
        addToCart(tempProductToAdd, qty);
        closeModals();
        document.getElementById('modal-success').classList.remove('hidden');
    } else {
        alert("Кількість має бути більше 0");
    }
};

function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ ...product, qty: quantity });
    }

    saveCart();
    updateCartCounter();
}

function renderCartTable() {
    const container = document.getElementById('cart-content');

    if (cart.length === 0) {
        container.innerHTML = "<p>Корзина пуста</p>";
        return;
    }

    let totalSum = 0;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Назва товару</th>
                    <th>Ціна за од.</th>
                    <th>К-сть</th>
                    <th>Сума</th>
                    <th>Дії</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, index) => {
        const itemSum = item.price * item.qty;
        totalSum += itemSum;

        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.qty}" 
                           onchange="changeCartQty(${item.id}, this.value)" style="width: 50px;">
                </td>
                <td>${itemSum}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Видалити</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <div style="text-align: right; font-size: 1.5em; margin: 20px 0;">
            <strong>Разом до оплати: ${totalSum} грн</strong>
        </div>
    `;

    container.innerHTML = html;
}

function changeCartQty(id, newQty) {
    const qty = parseInt(newQty);
    if (qty < 1) return;

    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty = qty;
        saveCart();
        renderCartTable();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCounter();
    renderCartTable();

    if (cart.length === 0) {
        showProducts();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}

function showCart() {
    closeModals();
    document.getElementById('products-page').classList.add('hidden');
    document.getElementById('cart-page').classList.remove('hidden');
    renderCartTable();
}

function showProducts() {
    closeModals();
    document.getElementById('cart-page').classList.add('hidden');
    document.getElementById('products-page').classList.remove('hidden');
}