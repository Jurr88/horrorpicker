// script.js
async function getMovieRecommendation() {
    const keyword1 = document.getElementById('keyword1').value;
    const keyword2 = document.getElementById('keyword2').value;
    const keyword3 = document.getElementById('keyword3').value;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Searching...";

    try {
        const movie = await fetchHorrorMovie(keyword1, keyword2, keyword3);
        if (movie) {
            resultDiv.innerHTML = `
                <h2>${movie.title} (${movie.year})</h2>
                <p>${movie.plot}</p>
                <p>IMDb Rating: ${movie.imdbRating}</p>
            `;
        } else {
            resultDiv.innerHTML = "No movie found. Please try different keywords.";
        }
    } catch (error) {
        console.error(error); // Log the error to the console
        resultDiv.innerHTML = "An error occurred. Please try again.";
    }
}

async function fetchHorrorMovie(keyword1, keyword2, keyword3) {
    // Replace with your OMDb API key
    const apiKey = 'a34859c9';

    // Use the CORS Anywhere proxy to avoid CORS policy issues
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const searchUrl = `${proxyUrl}http://www.omdbapi.com/?s=${keyword1}+${keyword2}+${keyword3}&type=movie&apikey=${apiKey}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.Response === 'True' && searchData.Search.length > 0) {
        const movieId = searchData.Search[0].imdbID;
        const movieDetailsUrl = `${proxyUrl}http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
        const detailsResponse = await fetch(movieDetailsUrl);
        const detailsData = await detailsResponse.json();

        return {
            title: detailsData.Title,
            year: detailsData.Year,
            plot: detailsData.Plot,
            imdbRating: detailsData.imdbRating
        };
    } else {
        return null;
    }
}
