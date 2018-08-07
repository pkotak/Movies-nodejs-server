const mongoose = require('mongoose');
const reviewSchema = require('./review.schema.server');

const reviewModel = mongoose.model(reviewSchema, 'ReviewModel');

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

var api = {
    createReview,
    findAllReviews,
    findReviewById,
    updateReview,
    deleteReview
}

module.exports = api;