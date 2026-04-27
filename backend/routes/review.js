const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");

const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewControllers = require("../controllers/reviews.js")



// ===================== CREATE REVIEW =====================
// Adds a new review to a specific listing
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewControllers.createReview)
);
 

// ===================== DELETE REVIEW =====================
// Removes a review from a listing
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview)
);

module.exports = router;