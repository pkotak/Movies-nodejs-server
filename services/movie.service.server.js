module.exports = app => {
    var userModel = require('../models/user/user.model.server');

    favoriteMovies = (req, res) => {
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        let favorite;
        let movieIndex = user.favorites.indexOf(req.params['movieId']);
        if (movieIndex > -1) {
            user.favorites.splice(movieIndex, 1);
            favorite = false;
        } else {
            user.favorites.push(req.params['movieId']);
            favorite = true;
        }

        userModel.updateUser(userId, user)
            .then(() => res.json({favorite: favorite}));
    }

    watchlistMovies = (req, res) => {
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        let watchlist;
        let movieIndex = user.watchList.indexOf(req.params['movieId']);
        if (movieIndex > -1) {
            user.watchList.splice(movieIndex, 1);
            watchlist = false;
        } else {
            user.watchList.push(req.params['movieId']);
            watchlist = true;
        }

        userModel.updateUser(userId, user)
            .then(() => res.json({watchlist: watchlist}));
    }

    app.post('/api/movie/:movieId/favorite', favoriteMovies);
    app.post('/api/movie/:movieId/watchlist', watchlistMovies);
}