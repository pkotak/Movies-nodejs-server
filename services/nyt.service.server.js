module.exports = function (app) {
    const fetch = require('node-fetch');
    const constants = require('../constants');

    findTopNews = (req, res) =>
        fetch('https://api.nytimes.com/svc/topstories/v2/movies.json?&api-key=' +
            process.env.NYT_API_KEY)
            .then(news => news.json())
            .then(body => res.send(body));


    // searchMovie = (req, res) =>
    //     fetch(constants.TMDB_BASE_URL +
    //         '/search/movie?query=' + req.params['movieName'] +
    //         '&api_key=' + process.env.TMDB_API_KEY)
    //         .then(movie => movie.json())
    //         .then(body => res.send(body));

    app.get('/api/news/top', findTopNews);
    // app.get('/api/movie/:movieName', searchMovie);
}