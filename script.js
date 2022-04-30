const email = 'fsconiglio@gmail.com';
const password = 'testtest';

let token;

function onTokenResponse(response)
{
    return response.json();
}

function onTokenJson(json)
{
    console.log(json);
    token = json.access_token;
}

fetch('https://kitsu.io/api/oauth/token',
{
    method: 'post',
    body: 'grant_type=password&username='+ email +'&password=' + password,
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
}).then(onTokenResponse).then(onTokenJson);

function onResponse(response)
{
    return response.json();
}

function onJsonAnime(json)
{
    console.log('JSON ricevuto');
    console.log(json);
    const movie = document.querySelector('#movie');
    movie.innerHTML = '';
    const anime = json.data[0].attributes;
    const title = document.createElement('h2');
    const original_title = document.createElement('h1');
    const img = document.createElement('img');
    const description = document.createElement('p');
    title.textContent = anime.titles.en;
    original_title.textContent = anime.titles.en_jp;
    img.src = anime.coverImage.original;
    description.textContent = anime.description;
    movie.appendChild(title);
    movie.appendChild(original_title);
    movie.appendChild(img);
    movie.appendChild(description);
}

const API_KEY = 'k_64j467tl';

function onJsonMovie(json)
{
    console.log(json);
    const movie = document.querySelector('#movie');
    movie.innerHTML = '';
    const movie_json = json.results[0];
    const title = document.createElement('h2');
    const year = document.createElement('h1');
    const img = document.createElement('img');
    title.textContent = movie_json.title;
    year.textContent = movie_json.description;
    img.src = movie_json.image;
    movie.appendChild(title);
    movie.appendChild(year);
    movie.appendChild(img);
    const url = 'https://imdb-api.com/en/API/MetacriticReviews/' + API_KEY + '/' + movie_json.id;
    fetch(url).then(onResponse).then(onJsonMovieDescription);
}

function onJsonMovieDescription(json)
{
    console.log(json);
    const movie = document.querySelector('#movie');
    const movie_json = json.items[0];
    const author = document.createElement('h1');
    const description = document.createElement('p');
    author.textContent = movie_json.author;
    description.textContent = '"' + movie_json.content + '"';
    movie.appendChild(author);
    movie.appendChild(description);
}

function movieSearch(event)
{
    event.preventDefault();
    const movie_input = movie_form.querySelector('#movie_text');
    const movie_value = encodeURIComponent(movie_input.value);
    console.log('Cerco: ' + movie_value);
    const url = 'https://imdb-api.com/en/API/SearchMovie/' + API_KEY + '/' + movie_value;
    console.log('URL: ' + url);
    fetch(url).then(onResponse).then(onJsonMovie);
}

function animeSearch(event)
{
    event.preventDefault();
    const anime_input = anime_form.querySelector('#anime_text');
    const anime_value = encodeURIComponent(anime_input.value);
    console.log('Cerco: ' + anime_value);
    const url = 'https://kitsu.io/api/edge/anime?filter[text]' + anime_value;
    console.log('URL: ' + url);
    fetch(url,
    {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': token.token_type + '' + token.access_token,
            'Content-Type': 'application/x-wwwform-urlencoded'
        }
    }).then(onResponse).then(onJsonAnime);
}

const movie_form = document.querySelector('#movie_form');
const anime_form = document.querySelector('#anime_form');

movie_form.addEventListener('submit', movieSearch);
anime_form.addEventListener('submit', animeSearch);

function onMovieClick(event)
{
    console.log('Scelto film');
    purge();
    const movie_form = document.querySelector('#movie_form');
    movie_form.classList.remove('hidden');
    movie_reset.classList.remove('hidden');
}

function onAnimeClick(event)
{
    console.log('Scelto anime');
    purge();
    const anime_form = document.querySelector('#anime_form');
    anime_form.classList.remove('hidden');
    anime_reset.classList.remove('hidden');
}

function purge()
{
    const movie = document.querySelector('#movie_box');
    const anime = document.querySelector('#anime_box');
    const movie_form = document.querySelector('#movie_form');
    const anime_form = document.querySelector('#anime_form');
    const question = document.querySelector('#question');
    movie.classList.add('hidden');
    anime.classList.add('hidden')
    question.classList.add('hidden');
    movie_form.classList.add('hidden');
    anime_form.classList.add('hidden')
}

function onMovieResetClick(event)
{
    const movie = document.querySelector('#movie');
    movie.innerHTML = '';
    movie_reset.classList.add('hidden');
    onAnimeClick();
}

function onAnimeResetClick(event)
{
    const movie = document.querySelector('#movie');
    movie.innerHTML = '';
    anime_reset.classList.add('hidden');
    onMovieClick();
}

const movie_box = document.querySelector('#movie_box div');
const anime_box = document.querySelector('#anime_box div');
const movie_reset = document.querySelector('#movie_reset');
const anime_reset = document.querySelector('#anime_reset');

movie_box.addEventListener('click', onMovieClick);
anime_box.addEventListener('click', onAnimeClick);
movie_reset.addEventListener('click', onMovieResetClick);
anime_reset.addEventListener('click', onAnimeResetClick);