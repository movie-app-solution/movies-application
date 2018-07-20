const {getMovies, addMovie, updateMovie, deleteMovie} = require('./api.js');

"use strict";

const buildHTML = (movies) => {
    $('#movies').html('');
    movies.forEach(({title, rating, id}) => {
        const movie = `
            <article>
                <h3>${title}</h3>
                <p>Rating: ${rating}</p>
                <p>Id: ${id}</p>
                <button data-dbid='${id}' class="edit-btn btn btn-warning">Edit</button>
                <button data-dbid='${id}' class="delete-btn btn btn-danger">Delete</button>
            </article>
        `;
        $('#movies').append(movie);
    });
};

const buildMovies = () => {
    $('#movies').html('<h1>Loading...</h1>');
    getMovies().then((movies) => {
        buildHTML(movies);
        return movies;
    }).then((movies) => {
        $('.edit-btn').click((e) => {
            const id = $(e.target).data('dbid');
            const movie = movies.filter((curr) => curr.id === id)[0];
            $('#update-movie-form').remove();
            const makeOptions = (selected) => {
                let html = '';
                for (let i = 1; i < 6; i += 1) {
                    html += `<option value="${i}" ` + ((selected === i) ?  'selected': '') + `>Rating ${i}</option>`;
                }
                return html;
            };
            $(e.target).parent().append(
                `
                <section id="movie-update-form">
                    <form action="" id="update-movie-form">
                        <label for="title">Movie Title</label>
                        <input id="update-title" name="title" type="movie-title" value="${movie.title}">
                        <label for="rating">Movie Rating</label>
                        <select name="rating" id="update-rating">
                `
                +
                        makeOptions(+movie.rating)
                +
                `
                        </select>
                        <button id="update-movie-btn" class="btn btn-warning">Update Movie</button>
                    </form>
                </section>
                `
            );
            $('#update-movie-btn').click((e) => {
                e.preventDefault();
                console.log($('#update-movie-form').serializeArray());
                const updatedMovie = $('#update-movie-form').serializeArray()
                    .reduce((prev, curr) => {
                        const key = curr['name'];
                        prev[key] = curr['value'];
                        return prev;
                    }, {});
                updatedMovie.id = +movie.id;
                updateMovie(updatedMovie).then(buildMovies);
            });

        });
        $('.delete-btn').click((e) => {
            const id = $(e.target).data('dbid');
            const movie = movies.filter((curr) => curr.id === id)[0];
            deleteMovie(movie.id).then(buildMovies);
        });
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
};

buildMovies();

$('#add-movie-btn').click(function(e) {
    e.preventDefault();
    const newMovie = $('#add-movie-form').serializeArray()
        .reduce((prev, curr) => {
            const key = curr['name'];
            prev[key] = curr['value'];
            return prev;
        }, {});
    addMovie(newMovie).then(buildMovies);
});





