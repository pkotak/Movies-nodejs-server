module.exports = app => {
    var userModel = require('../models/user/user.model.server');

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
            user.watchList.push(req.params['movieId']);
        }
        else {
            let movieIndex = user.watchList.indexOf(req.params['movieId']);
            if (movieIndex > -1)
                user.watchList.splice(movieIndex, 1);
        }

        userModel.updateUser(userId, user)
            .then(user => res.json(user));
    }

    app.post('/api/movie/:movieId/favorite', favoriteMovies);
    app.post('/api/movie/:movieId/watchlist', watchlistMovies);
}