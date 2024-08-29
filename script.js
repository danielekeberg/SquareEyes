let moviesData = [];

function displayMovies(genre) {
    const container = document.getElementById('movies-container');
    container.innerHTML = '';

    const filteredMovies = genre === 'all' ? moviesData : moviesData.filter(movie => movie.genre === genre);

    filteredMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        movieDiv.innerHTML = `
            <a href="product.html?id=${movie.id}">
                <img src="${movie.image.url}" alt="${movie.image.alt}">
                <h2>${movie.title}</h2></a>
                <p><strong>Price:</strong> $${movie.price}</p>`;

        container.appendChild(movieDiv);
    });
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        moviesData = data.data;
const genres = ['all', ...new Set(moviesData.map(movie => movie.genre))];
const genreFilter = document.getElementById('genre-filter');

genres.forEach(genre => {
    const option = document.createElement('option');
    
    if (genre === 'all') {
        option.value = 'all';
        option.textContent = 'All Genres';
    } else {
        option.value = genre;
        option.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    }

    genreFilter.appendChild(option);
});

        displayMovies('all');
        genreFilter.addEventListener('change', (event) => {
            displayMovies(event.target.value);
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });
