const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const MAP_TOKEN = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({accessToken: MAP_TOKEN});

// ===================== INDEX =====================
module.exports.index = async (req, res) => {

    const {category, search} = req.query;

    let filter = {};
    let message = null;
    let messageType = "success";

    if(category && category !== "All"){
        filter.category = category;
    }

    if(search && search.trim() !== ""){

        let cleanSearch = search.trim();

        filter.$or = [
            {title: {$regex: cleanSearch, $options:"i"}},
            {location: {$regex: cleanSearch, $options:"i"}},
            {country: {$regex: cleanSearch, $options:"i"}},

        ]

        const allListings = await Listing.find(filter);

        if (allListings.length > 0) {
            message = `${allListings.length} stays found for "${cleanSearch}"`;
            messageType = "success";
        } else {
            message = `No stays found for "${cleanSearch}"`;
            messageType = "warning";
        }

        return res.render("listings/index.ejs", {
            allListings,
            category,
            search,
            message,
            messageType
        });
    }
    
    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", {
           allListings, 
           category, 
           search, 
           message
        });
};


// ===================== NEW FORM =====================
module.exports.newForm =  (req, res) => {
    console.log(req.user);
    res.render("listings/form.ejs");
};


// ===================== CREATE LISTING =====================
module.exports.createListing = async (req, res) => {
    
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    if (!response.body.features.length) {
        req.flash("error", "Location not found. Please try a more specific address.");
        return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"..", filename);
    
    let { listing } = req.body;

    if (!listing) {
        req.flash("error", "Invalid listing data submitted .");
        return res.redirect("/listings");
    }

    const newListing = new Listing(listing);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,  
            filename: req.file.filename
        };
    }

    newListing.geometry = response.body.features[0].geometry;
    
    let savedListing = await newListing.save();
    

    req.flash("success", "Listing created successfully.");
    res.redirect("/listings");
};


// ===================== SHOW LISTING =====================
module.exports.showListing = async(req, res) => {
    let {id} = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path : "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    if(!listing){
           req.flash("error", "Requested listing was not found.");
           return res.redirect('/listings');
    }

    res.render("listings/show.ejs" , {listing});
};


// ===================== EDIT FORM =====================
module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);
        
    if(!listing){
        req.flash("error", "Listing you requested for doesn't exist !");
        return res.redirect('/listings');
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/e_blur:300");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};


// ===================== UPDATE LISTING =====================
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let { listing } = req.body;

    if (!listing) {
        req.flash("error", "Invalid listing data");
        return res.redirect(`/listings/${id}/edit`);
    }

    let updatedListing = await Listing.findByIdAndUpdate(id, {...listing}, { runValidators: true, new: true });

    if (!updatedListing) {
        

        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        updatedListing.image = {url, filename};
        await updatedListing.save();
    }

    req.flash("success", "Listing updated successfully.");
    res.redirect(`/listings/${id}`);
};


// ===================== DELETE LISTING =====================
module.exports.destroyListing = async(req, res) => {
    let {id} = req.params;
    
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing );
    
    if (!deletedListing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    req.flash("success", "Listing updated successfully.");
    res.redirect("/listings");
};



