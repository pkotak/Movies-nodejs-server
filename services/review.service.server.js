module.exports = function (app) {

    app.post('/api/review',createReview);
    app.get('/api/review/:movieId',findAllReviewsForMovie);
    app.get('/api/review/:userId/user',findAllReviewsForUser);
    let reviewModel = require('../models/review/review.model.server');

    function createReview(req,res){
        var reviewInput = req.body;
        var review = {
            title: reviewInput.title,
            text: reviewInput.text,
            movieName: reviewInput.movieName,
            movieId: reviewInput.movieId,
            reviewerId: req.session.currentUser._id,
            reviewer: req.session.currentUser,
            createdDate: new Date()
        }
        reviewModel.createReview(review)
            .then(review=>{
                res.sendStatus(200);
            });
    }

    function findAllReviewsForMovie(req, res) {
        var movieId = req.params['movieId'];
        reviewModel.findAllReviewsForMovie(movieId)
            .then(reviews => res.json(reviews));
    }

    function findAllReviewsForUser(req, res) {
        var userId = req.params['userId'];
        reviewModel.findAllReviewsForUser(userId)
            .then(reviews => res.json(reviews));
    }
}