function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function displayCartItems(moviesData) {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(id => {
            const movie = moviesData.find(m => m.id === id);
            if (movie) {
                totalPrice += movie.price;
                
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('cart-item');

                movieDiv.innerHTML = `
                    <h3>${movie.title}</h3>
                    <img src="${movie.image.url}" alt="${movie.image.alt}" class="cart-item-image">
                    <p>Price: $${movie.price}</p>
                    <button class="remove-btn" data-id="${movie.id}">Remove from Cart</button>
                `;

                cartContainer.appendChild(movieDiv);
            }
        });
    }

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            removeFromCart(event.target.dataset.id);
        });
    });
}

function removeFromCart(id) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayCartItems(data.data);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('checkout-button').addEventListener('click',clearCartAndCheckout);
});

function clearCartAndCheckout() {
    console.log('Clearing cart and redirecting...');
    localStorage.removeItem('cart');
    window.location.href = 'checkout.html';
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        displayCartItems(data.data);
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });