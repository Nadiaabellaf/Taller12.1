const url = "https://japceibal.github.io/japflix_api/movies-data.json";
let movies = [];

// Cargar las películas al iniciar la página
window.onload = async function() {
    try {
        const response = await fetch(url);
        movies = await response.json();
        console.log("Películas cargadas:", movies); // Para verificar que se cargaron
    } catch (error) {
        console.error("Error al cargar las películas:", error);
    }
};

// Función para buscar películas
document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value.toLowerCase();
    const results = movies.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.genres.some(genre => genre.name.toLowerCase().includes(query)) || 
        movie.tagline.toLowerCase().includes(query) || 
        movie.overview.toLowerCase().includes(query)
    );

    console.log("Resultados de búsqueda:", results); // Verificar en consola
    displayResults(results);
});

// Mostrar resultados de búsqueda
function displayResults(results) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    results.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'list-group-item bg-secondary text-light';
        li.innerHTML = `
            <h5>${movie.title}</h5>
            <p>${movie.tagline}</p>
            <p>${getStars(movie.vote_average)}</p>
            <button class="btn btn-info" onclick="showDetails(${movie.id})">Ver detalles</button>
        `;
        lista.appendChild(li);
    });
}

// Función para mostrar detalles de la película
function showDetails(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        const genres = movie.genres.map(genre => genre.name).join(', ');
        const details = `
            <h5>${movie.title}</h5>
            <p>${movie.overview}</p>
            <p>Géneros: ${genres}</p>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Más información
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">Año de lanzamiento: ${movie.release_date.split('-')[0]}</li>
                    <li class="dropdown-item">Duración: ${movie.runtime} minutos</li>
                    <li class="dropdown-item">Presupuesto: $${movie.budget}</li>
                    <li class="dropdown-item">Ganancias: $${movie.revenue}</li>
                </ul>
            </div>
        `;
        document.getElementById('detailsContainer').innerHTML = details;
    }
}

// Función para obtener estrellas según el voto
function getStars(vote) {
    const starCount = Math.round(vote / 2);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fa fa-star ${i <= starCount ? 'text-warning' : 'text-secondary'}"></i>`;
    }
    return stars;
}

