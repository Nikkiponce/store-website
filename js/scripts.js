document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Load cart from local storage
    loadCart();
});

function addToCart(event) {
    const product = event.target.closest('.product');
    const productId = product.getAttribute('data-id');
    const productName = product.querySelector('h2').innerText;
    const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));

    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    let cartTotal = 0;

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(listItem);
        cartTotal += item.price * item.quantity;
    });

    cartTotalContainer.innerText = cartTotal.toFixed(2);
}

document.getElementById('checkout').addEventListener('click', () => {
    alert('Checkout functionality is not implemented yet.');
});

// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Simulate sending the form data to a server (in real-world scenarios, you'd make an AJAX request)
        // For demonstration purposes, just show the success message
        showSuccessMessage();
    });

    function showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        successMessage.style.display = 'block';
    }
});
// Add to Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const product = button.parentElement;
            const productId = product.dataset.id;
            const productName = product.querySelector('h2').textContent;
            const productPrice = product.querySelector('p').textContent;

            // Simulate adding to cart (replace with your actual logic)
            addToCart(productId, productName, productPrice);
        });
    });

    // Function to add item to cart (replace with your actual cart handling logic)
    function addToCart(id, name, price) {
        console.log(`Added to cart: ${name} - ${price}`);

        // Optionally update UI or send data to server
        alert(`Added to cart: ${name} - ${price}`);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');

    // Initialize or retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart display
    function updateCart() {
        cartItemsElement.innerHTML = ''; // Clear existing items
        let total = 0;

        // Iterate over cart items and display them
        cart.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.innerHTML = `
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Description of the product.</p>
                </div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            `;
            cartItemsElement.appendChild(itemElement);
            total += item.price;
        });

        // Update total price
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Add-to-cart button click event listener (simulated with data attributes)
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const item = { name, price };
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart(); // Update cart display
        });
    });

    // Initial update of cart
    updateCart();

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        localStorage.removeItem('cart'); // Clear cart in localStorage
        cart = []; // Clear local cart variable
        updateCart(); // Update cart display
        alert('Thank you for your purchase! Your order has been successfully processed.');
        window.location.href = 'index.html'; // Redirect to home page
    });
});

