function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

fetch('js/data.json')
    .then(response => response.json())
    .then(data => {
        const movieId = getQueryParam('id');
        const movie = data.data.find(m => m.id === movieId);

        if (movie) {
            const detailsDiv = document.getElementById('movie-details');

            detailsDiv.innerHTML = `
                <h1>${movie.title}</h1>
                <img src="${movie.image.url}" alt="${movie.image.alt}">
                <p><strong>Description:</strong> ${movie.description}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <p><strong>Released:</strong> ${movie.released}</p>
                <p><strong>Price:</strong> $${movie.price}</p>
                ${movie.onSale ? `<p><strong>On Sale:</strong> Discounted Price: $${movie.discountedPrice}</p>` : ''}
            `;

            const addToCartButton = document.getElementById('add-to-cart');
            const removeFromCartButton = document.getElementById('remove-from-cart');

            addToCartButton.addEventListener('click', () => {
                addToCart(movieId);
            });

            removeFromCartButton.addEventListener('click', () => {
                removeFromCart(movieId);
            });

            updateCartButtons(movieId);
        }
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });

function addToCart(movieId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(movieId)) {
        cart.push(movieId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartButtons(movieId);
}

function removeFromCart(movieId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== movieId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartButtons(movieId);
}

function updateCartButtons(movieId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButton = document.getElementById('add-to-cart');
    const removeFromCartButton = document.getElementById('remove-from-cart');

    if (cart.includes(movieId)) {
        addToCartButton.disabled = true;
        removeFromCartButton.disabled = false;
    } else {
        addToCartButton.disabled = false;
        removeFromCartButton.disabled = true;
    }
}


