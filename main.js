const products = [
    {
        img: "product1.jpg",
        alt: "product 1",
        name: "Lancome La Vie Est Belle 75ml",
        link: "product.html",
        description: "A fragrance with a powerful trail, with a perfect balance between the nobility of Iris, the depth of Patchouli, and an alluring Vanilla accord, creating the perfect scent of happiness.",
        price: 637
    },
    {
        img: "product2.avif",
        alt: "product 2",
        name: "Marc Jacobs Daisy Eau So Fresh Eau de Toilette 75ml",
        description: "The scent's enticing top notes of raspberry and grapefruit sparkle on the skin like sunshine, deepening into a sensuous heart of wild rose and a musky, sophisticated finish of warm plum and cedarwood.",
        price: 408
    },
    {
        img: "product3.avif",
        alt: "product 3",
        name: "Calvin Klein CK IN2U Her 100ml",
        description: "This iconic scent features the refreshing notes of Italian bergamot and zesty mandarin, complemented by the clean essence of green tea and sensual musk.",
        price: 160
    },
    {
        img: "product4.jpg",
        alt: "product 4",
        name: "Giorgio Armani Sì Women EDP 50 ml",
        description: "Sì has a top note of blackcurrant nectar, a heart of freesia and Rose of Mai, with a musky blond wood base.",
        price: 639
    }
];

let cart = [];

function renderProducts(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ""; 

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.alt}">
            <h2>${product.link ? `<a href="${product.link}">${product.name}</a>` : product.name}</h2>
            <p>${product.description}</p>
            <div class="product-footer">
                <p class="price">${product.price} dkk</p>
                <button onclick="addToCart(${product.price}, '${product.name}', '${product.img}')">
                    <i class="fa-solid fa-cart-shopping"></i> <!-- Removed the "Add to Cart" text -->
                </button>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });
}

function addToCart(price, name, img) {
    const productInCart = cart.find(item => item.name === name);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }

    alert(`${name} has been added to your cart!`);

    updateCartModal();
}

function updateCartModal() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItemsList.innerHTML = ''; 

    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - ${item.quantity} x ${item.price} dkk`;
        cartItemsList.appendChild(listItem);

        total += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: ${total} dkk`;
}

function toggleCartModal() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
}

function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add products to your cart before proceeding.");
        return;
    }

    alert("Thank you for your purchase! Your order will be processed shortly.");
    
    cart = [];
    updateCartModal();
    toggleCartModal(); 
}

function sortProducts(products, criteria = 'price', order = 'asc') {
    return products.sort((a, b) => {
        if (criteria === 'price') {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (criteria === 'name') {
            return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
    });
}

function handleSortChange(event) {
    const selectedOption = event.target.value;
    const [sortBy, order] = selectedOption.split('-');
    
    sortAndRender(sortBy, order);
}

function sortAndRender(criteria, order) {
    const sortedProducts = sortProducts([...products], criteria, order);
    renderProducts(sortedProducts);
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});
