const apiBaseUrl = 'http://localhost:3000';

async function getMovies() {
  try {
    const response = await fetch(`${apiBaseUrl}/movies`);
    const movies = await response.json();
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = ''; // Clear the list before adding new items

    movies.forEach(movie => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${movie.posterPath}" alt="${movie.title}" style="width: 50px; height: 75px; margin-right: 10px;">
          <span>${movie.title}</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="addFavourite(${movie.id})">Add to Favourites</button>
      `;
      moviesList.appendChild(li);
    });

    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

async function getFavourites() {
  try {
    const response = await fetch(`${apiBaseUrl}/favourites`);
    const favourites = await response.json();
    const favouritesList = document.getElementById('favouritesList');
    favouritesList.innerHTML = ''; // Clear the list before adding new items

    favourites.forEach(fav => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${fav.posterPath}" alt="${fav.title}" style="width: 50px; height: 75px; margin-right: 10px;">
          <span>${fav.title}</span>
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeFavourite(${fav.id})">Remove</button>
      `;
      favouritesList.appendChild(li);
    });

    return favourites;
  } catch (error) {
    console.error('Error fetching favourites:', error);
  }
}

async function addFavourite(movieId) {
  try {
    const response = await fetch(`${apiBaseUrl}/movies/${movieId}`);
    const movie = await response.json();

    await fetch(`${apiBaseUrl}/favourites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });

    await getFavourites();
  } catch (error) {
    console.error('Error adding favourite:', error);
  }
}

async function removeFavourite(movieId) {
  try {
    await fetch(`${apiBaseUrl}/favourites/${movieId}`, { method: 'DELETE' });

    await getFavourites();
  } catch (error) {
    console.error('Error removing favourite:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getMovies();
  getFavourites();
});