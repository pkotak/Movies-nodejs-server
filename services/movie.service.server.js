module.exports = app => {
    let userModel = require('../models/user/user.model.server');
    let movieModel = require('../models/movie/movie.model.server');
    let likeMovieModel = require('../models/likeMovie/likeMovie.model.server');
    let recommendedMovieModel = require('../models/movieRecommended/movieRecommended.model.server');

    favoriteMovies = (req, res) => {
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        if (req.body.favorite === 'true') {
            user.favorites.push(req.params['movieId']);
        }
        else {
            let movieIndex = user.favorites.indexOf(req.params['movieId']);
            if (movieIndex > -1)
                user.favorites.splice(movieIndex, 1);
        }

        userModel.updateUser(userId, user)
            .then(user => res.json(user));
    }

    watchlistMovies = (req, res) => {
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        if (req.body.save === 'true') {

            console.log("Save", req.params['movieId'], user);
            user.watchList.push(req.params['movieId']);
        }
        else {
            let movieIndex = user.watchList.indexOf(req.params['movieId']);
            console.log("Else", req.params['movieId'], user, movieIndex);
            if (movieIndex > -1)
                user.watchList.splice(movieIndex, 1);
        }

        userModel.updateUser(userId, user)
            .then(user => res.json(user));
    }

    function likeMovie(req, res) {
        let movie = req.body;
        let user = req.session.currentUser;
        let newMovie = {
            title: movie.title,
            id: movie.id,
            release_date: movie.release_date,
            poster_path: (movie.poster_path.length !== 0 ? movie.poster_path : '')
        };
        if (user === undefined) {
            res.sendStatus(500);
        }
        else {
            movieModel.findMoviebyId(newMovie.id)
                .then(queryresult => {
                    if (queryresult === null) {
                        movieModel.createMovie(newMovie)
                            .then((movie) =>
                                likeMovieModel.findByHash(req.session.userId, movie._id)
                                    .then(hashFindResult => {
                                        if (hashFindResult === null) {
                                            likeMovieModel.createLike(req.session.userId, movie._id)
                                                .then(() => res.sendStatus(200))
                                        }
                                        else {
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        likeMovieModel.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult => {
                                if (hashFindResult === null) {
                                    likeMovieModel.createLike(req.session.userId, queryresult._id)
                                        .then(() => res.sendStatus(200))
                                }
                                else {
                                    res.sendStatus(501)
                                }
                            })
                    }
                });
        }

    }

    function dislikeMovie(req, res) {
        let movie = req.body;
        let user = req.session.currentUser;
        likeMovieModel.dislikeMovie(user._id, movie._id)
            .then(() => res.sendStatus(200))
    }

    function getFavoriteMovies(req, res) {
        let user = req.session.currentUser;
        let resultMovies = [];
        likeMovieModel.findLikedMovieForUser(user._id)
            .then((likedMovies) => {
                likedMovies.map((likedMovie) => {
                    resultMovies.push(likedMovie.Movie)
                });
                res.send(resultMovies);
            })
            .catch(() => {
                res.sendStatus(501);
                res.send(resultMovies);
            });
    }

    app.post('/api/movie/:movieId/favorite', favoriteMovies);
    app.post('/api/movie/:movieId/watchlist', watchlistMovies);
    app.post('/api/likeMovie', likeMovie);
    app.get('/api/likedMovies', getFavoriteMovies);
    app.delete('/api/dislikeMovie', dislikeMovie);

    function getRecommendedMovies() {

    }

    app.get('/api/recommendedMovies', getRecommendedMovies);

    function removeRecommendedMovie() {

    }

    app.delete('/api/unrecommendMovie', removeRecommendedMovie);
}