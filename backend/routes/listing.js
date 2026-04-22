const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


//============================INDEX ROUTE============================
//Display all listings
router.get("/", async (req, res) => {
    const allListings = await Listing.find({ });
    res.render("listings/index.ejs", {allListings});
});


//============================INDEX ROUTE============================
//Renders form to create new listing (only for logged-in users)
router.get("/new", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render("listings/form.ejs");
});


//============================CREATE ROUTE============================
//Creates a new listing and assign current user as owner
router.post(
    "/", 
    isLoggedIn, 
    validateListing, 
    wrapAsync(async (req, res, next) => {
       const newListing = new Listing(req.body.listing); 
       newListing.owner = req.user._id;

       await newListing.save();
    
       req.flash("success", "New Listing Created !");
       res.redirect("/listings"); 
    })
);


//============================SHOW ROUTE============================
//Displays a single listing with populated reviews and owner
router.get(
    "/:id",
    isLoggedIn,
    wrapAsync(async(req, res) => {
       let {id} = req.params;

       const listing = await Listing.findById(id)
           .populate("reviews")
           .populate("owner");

        if(!listing){
           req.flash("error", "Listing you requested for doesn't exist !");
           return res.redirect('/listings');
        }

        console.log(listing);
        res.render("listings/show.ejs" , {listing});
    })
);


//============================EDIT ROUTE============================
// Renders edit form (only owner can access)
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(async(req, res) => {
        let { id } = req.params;

        const listing = await Listing.findById(id);
        
        if(!listing){
            req.flash("error", "Listing you requested for doesn't exist !");
            return res.redirect('/listings');
        }

        res.render("listings/edit.ejs", {listing});
    })
);


//============================UPDATE ROUTE============================
// Updates listing details (only owner allowed)
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async(req, res) => {
        let {id} = req.params;
    
        await Listing.findByIdAndUpdate(id, {...req.body.listing} );   //deconstructed
    
        req.flash("success", "Listing Updated  !");
        res.redirect(`/listings/${id}`);
    })
);


//============================DELETE ROUTE============================
// Deletes a listing (only owner allowed)
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async(req, res) => {
        let {id} = req.params;
    
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing );
    
        req.flash("success", " Listing deleted !");
        res.redirect("/listings");
}));

module.exports = router;


