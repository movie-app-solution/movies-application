module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  addMovie: (movie) => {
      const url = '/api/movies';
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(movie),
      };
      return fetch(url, options)
          .then(console.log('Post Created!'))
          .catch(/* handle errors */);
  },
  updateMovie: (movie) => {
      const url = `/api/movies/${movie.id}`;
      const options = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(movie),
      };
      return fetch(url, options)
          .then(console.log('Post Updated!'))
          .catch(/* handle errors */);
  },
    deleteMovie: (id) => {
        const url = `/api/movies/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        return fetch(url, options)
            .then(console.log('Post Deleted!'))
            .catch(/* handle errors */);
    },
};

