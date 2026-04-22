const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isLoggedIn} = require("../middleware.js");

//Server Side Validation for forms
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//Index route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({ });
    res.render("listings/index.ejs", {allListings});
});

//New route 
router.get("/new", isLoggedIn, (req, res) => {
    console.log(req.user);
   
    res.render("listings/form.ejs");
});

//Create route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    // This grabs the entire object sent by the form
    const newListing = new Listing(req.body.listing); 
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created !");
    res.redirect("/listings"); 
})
);

//Show route for individual listing READ only
router.get("/:id",isLoggedIn, wrapAsync(async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for doesn't exist !");
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render("listings/show.ejs" , {listing});
}));

//Edit route
router.get("/:id/edit" ,isLoggedIn, wrapAsync(async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error", "Listing you requested for doesn't exist !");
        return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", {listing});
}));

//Update route
router.put("/:id",isLoggedIn, validateListing, wrapAsync(async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing} );   //deconstructed
    req.flash("success", "Listing Updated  !");
    res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id", isLoggedIn, wrapAsync(async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing );
    req.flash("success", " Listing deleted !");
    res.redirect("/listings");
}));

module.exports = router;


