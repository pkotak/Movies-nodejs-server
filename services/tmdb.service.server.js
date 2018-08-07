module.exports = function (app) {
    const fetch = require('node-fetch');
    const constants = require('../constants');

    findPopularMovies = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/discover/movie?sort_by=popularity.desc&api_key=' +
            process.env.TMDB_API_KEY)
            .then(movies => movies.json())
            .then(body => res.send(body));


    searchMovie = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/search/movie?query=' + req.params['movieName'] +
            '&api_key=' + process.env.TMDB_API_KEY)
            .then(movie => movie.json())
            .then(body => res.send(body));

    app.get('/api/movie/popular', findPopularMovies);
    app.get('/api/movie/:movieName', searchMovie);
}