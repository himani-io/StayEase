const Listing =  require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");


// ===================== AUTHENTICATION =====================
// Ensures the user is logged in before accessing protected routes
module.exports.isLoggedIn = (req, res, next) => {
     if(!req.isAuthenticated()){
     
        // if (req.method === "GET") {
        //     req.session.redirectUrl = req.originalUrl;
        // }
        req.session.redirectUrl = req.originalUrl;
        console.log("isLoggedIn hit:", req.originalUrl);
        console.log("Saved URL:", req.originalUrl);

        req.flash("error", "Please log in first.");
        return res.redirect("/login");
    }
    next();
};


// ===================== REDIRECT HANDLER =====================
// Stores and clears redirect URL after successful login
module.exports.saveRedirectUrl = (req, res, next) =>{
   if(req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
      delete req.session.redirectUrl; 
    }
   next();
};


// ===================== AUTHORIZATION =====================
// Ensures only the listing owner can modify or delete the listing
module.exports.isOwner = async(req, res, next) => {
   let {id} = req.params;

   let listing = await Listing.findById(id);
    
   // Handle case where listing does not exist
    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    // Check ownership
    if(!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not authorized to edit this listing. ");
        return res.redirect(`/listings/${id}`)
    }

    next();
};


// ===================== VALIDATION: LISTING =====================
// Validates listing data using Joi schema before saving/updating
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    console.log(error);

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        
        if (errMsg.includes("price")) {

           req.flash("error", "Enter a valid price");

        } else {

           req.flash("error", "Please fill all required fields correctly");

        }

            return res.redirect("/listings/new");
        }else{
            next();
        };
};


// ===================== VALIDATION: REVIEW =====================
// Validates review data using Joi schema before saving
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
   
    if(error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(",");

        req.flash("error", errMsg);

        // throw new ExpressError(400, errMsg);

        return res.redirect(`/listings/${req.params.id}`);
    }else{
        next();
    }
};


// ===================== REVIEW =====================
//Ensure only the author has permission to delte the review
module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;

    let review = await Review.findById(reviewId);
    console.log(Review);

    if (!review) {
       req.flash("error", "Review not found");
       return res.redirect(`/listings/${id}`);
    }

    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized to delete this review. ");
        return res.redirect(`/listings/${id}`);
    }

    next();
}