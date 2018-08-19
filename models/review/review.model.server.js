const mongoose = require('mongoose');
const reviewSchema = require('./review.schema.server');
const reviewModel = mongoose.model('ReviewModel', reviewSchema);

createReview = review =>
    reviewModel.create(review);

findAllReviews = () =>
    reviewModel.find();

findReviewById = reviewId =>
    reviewModel.findById(reviewId);

updateReview = (reviewId, updatedReview) =>
    reviewModel.update({_id: reviewId}, {
        $set: updatedReview
    });

deleteReview = reviewId =>
    reviewModel.remove({_id: reviewId});

findAllReviewsForMovie = movieId =>
    reviewModel.find({movieId: movieId});

findAllReviewsForUser = userId =>
    reviewModel.find({reviewerId: userId});

var api = {
    createReview,
    findAllReviews,
    findReviewById,
    updateReview,
    deleteReview,
    findAllReviewsForMovie,
    findAllReviewsForUser
}

module.exports = api;