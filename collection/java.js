// =================================
// ODNOZNACHNO — КОРЗИНА И ЗАКАЗЫ
// =================================

let currentProduct = "";
let currentPrice = 0;
let selectedSize = "";

let cart = [];

// ТВОЙ TELEGRAM USERNAME
const telegramUsername = "odnoznachnomsk";


// ОТКРЫТИЕ ОКНА ТОВАРА

function openOrder(product, price) {
    currentProduct = product;
    currentPrice = price;
    selectedSize = "";

    document.getElementById("orderProduct").textContent = product;
    document.getElementById("orderPrice").textContent = price + " ₽";

    document.querySelectorAll(".sizes button").forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById("sizeError").style.display = "none";

    document.getElementById("orderModal").style.display = "flex";
}


// ЗАКРЫТИЕ ОКНА ТОВАРА

function closeOrder() {
    document.getElementById("orderModal").style.display = "none";
}


// ВЫБОР РАЗМЕРА

function selectSize(button) {
    document.querySelectorAll(".sizes button").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");
    selectedSize = button.textContent;

    document.getElementById("sizeError").style.display = "none";
}


// ДОБАВЛЕНИЕ В КОРЗИНУ

function addToCart() {

    if (!selectedSize) {
        document.getElementById("sizeError").style.display = "block";
        return;
    }

    cart.push({
        name: currentProduct,
        price: currentPrice,
        size: selectedSize
    });

    updateCart();

    closeOrder();

   showToast("Товар добавлен в корзину!");
}


// ОБНОВЛЕНИЕ КОРЗИНЫ

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const floatingCartTotal = document.getElementById("floatingCartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += Number(item.price);

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p>${item.name}</p>
                    <span>Размер: ${item.size}</span><br>
                    <span>${item.price} ₽</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toLocaleString("ru-RU") + " ₽";
    floatingCartTotal.textContent = total.toLocaleString("ru-RU") + " ₽";

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Ваша корзина пока пуста</p>`;
    }
}
// УДАЛЕНИЕ ТОВАРА

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


// ОТКРЫТИЕ КОРЗИНЫ

function openCart() {
    updateCart();
    document.getElementById("cartModal").style.display = "flex";
}


// ЗАКРЫТИЕ КОРЗИНЫ

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}


// ОФОРМЛЕНИЕ ЗАКАЗА

function checkout() {

    if (cart.length === 0) {
        alert("Сначала добавьте товары в корзину!");
        return;
    }

    let total = 0;

    let message = "Здравствуйте! Хочу оформить заказ в ODNOZNACHNO:\n\n";

    cart.forEach((item, index) => {

        message += `${index + 1}. ${item.name}\n`;
        message += `Размер: ${item.size}\n`;
        message += `Цена: ${item.price} ₽\n\n`;

        total += item.price;
    });

    message += `ИТОГО: ${total} ₽`;

    const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}


// ЗАКРЫТИЕ ПРИ НАЖАТИИ НА ФОН

document.getElementById("orderModal").addEventListener("click", function(event) {
    if (event.target === this) closeOrder();
});

document.getElementById("cartModal").addEventListener("click", function(event) {
    if (event.target === this) closeCart();
});

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", closeMenu);
});




// =================================
// КАРТОЧКА ТОВАРА / ГАЛЕРЕЯ
// =================================

// Сейчас в архиве есть только одно фото товара.
// Дополнительные фото можно добавить в массив images для каждого товара.
const productDetails = [
    {
        name: "Футболка №1",
        price: 1500,
        images: [
            "/img/catalog-product-01-1.png",
            "/img/catalog-product-01-2.png",
            "/img/catalog-product-01-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №2",
        price: 1500,
        images: [
            "/img/catalog-product-02-1.png",
            "/img/catalog-product-02-2.png",
            "/img/catalog-product-02-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №3",
        price: 1500,
        images: [
            "/img/catalog-product-03-1.png",
            "/img/catalog-product-03-2.png",
            "/img/catalog-product-03-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №4",
        price: 1500,
        images: [
            "/img/catalog-product-04-1.png",
            "/img/catalog-product-04-2.png",
            "/img/catalog-product-04-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №5",
        price: 1500,
        images: [
            "/img/catalog-product-05-1.png",
            "/img/catalog-product-05-2.png",
            "/img/catalog-product-05-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №6",
        price: 1500,
        images: [
            "/img/catalog-product-06-1.png",
            "/img/catalog-product-06-2.png",
            "/img/catalog-product-06-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №7",
        price: 1500,
        images: [
            "/img/catalog-product-07-1.png",
            "/img/catalog-product-07-2.png",
            "/img/catalog-product-07-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    },
    {
        name: "Футболка №8",
        price: 1500,
        images: [
            "/img/catalog-product-08-1.png",
            "/img/catalog-product-08-2.png",
            "/img/catalog-product-08-3.png"
        ],
        description: "Футболка ODNOZNACHNO — городской стиль, лаконичный дизайн и внимание к деталям. NOT JUST CLOTHING. IT'S AN ATTITUDE.",
        material: "95% хлопок, 5% лайкра",
        fit: "Relaxed Fit",
        color: "Чёрный"
    }
];

let activeDetailsProduct = 0;
let activeDetailsPhoto = 0;

function openProductDetails(index) {
    const product = productDetails[index];
    if (!product) return;

    activeDetailsProduct = index;
    activeDetailsPhoto = 0;

    document.getElementById("detailsProductName").textContent = product.name;
    document.getElementById("detailsProductPrice").textContent =
        product.price.toLocaleString("ru-RU") + " ₽";
    document.getElementById("detailsProductDescription").textContent = product.description;
    document.getElementById("detailsProductMaterial").textContent = product.material;
    document.getElementById("detailsProductFit").textContent = product.fit;
    document.getElementById("detailsProductColor").textContent = product.color;

    renderProductDetailsGallery();

    document.getElementById("detailsBuyButton").onclick = function () {
        closeProductDetails();
        openOrder(product.name, product.price);
    };

    document.getElementById("productDetailsModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function renderProductDetailsGallery() {
    const product = productDetails[activeDetailsProduct];
    const mainImage = document.getElementById("detailsMainImage");
    const thumbnails = document.getElementById("detailsThumbnails");

    mainImage.src = product.images[activeDetailsPhoto];
    thumbnails.innerHTML = "";

    product.images.forEach((image, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "details-thumbnail" + (index === activeDetailsPhoto ? " active" : "");

        const img = document.createElement("img");
        img.src = image;
        img.alt = product.name + " — фото " + (index + 1);
        button.appendChild(img);

        button.addEventListener("click", () => {
            activeDetailsPhoto = index;
            renderProductDetailsGallery();
        });

        thumbnails.appendChild(button);
    });

    const arrows = document.querySelectorAll(".details-photo-arrow");
    arrows.forEach(arrow => {
        arrow.style.display = product.images.length > 1 ? "flex" : "none";
    });
}

function changeProductPhoto(direction) {
    const images = productDetails[activeDetailsProduct].images;
    if (images.length < 2) return;

    activeDetailsPhoto = (activeDetailsPhoto + direction + images.length) % images.length;
    renderProductDetailsGallery();
}

function closeProductDetails() {
    document.getElementById("productDetailsModal").style.display = "none";
    document.body.style.overflow = "";
}

document.getElementById("productDetailsModal").addEventListener("click", function (event) {
    if (event.target === this) closeProductDetails();
});


// ПЕРВОНАЧАЛЬНОЕ ОБНОВЛЕНИЕ

updateCart();

/* SITE LOADER */

window.addEventListener("load", function () {
    setTimeout(function () {
        const loader = document.getElementById("siteLoader");

        if (loader) {
            loader.classList.add("hidden");
        }
    }, 700);
});
