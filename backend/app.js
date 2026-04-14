const express =require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

const port = 8080;

main().then(() => {
    console.log("connection success !");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/stayease");
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
   res.render("listings/index.ejs");
});

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


//Server Side Validation for Reviews
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    // console.log(error.name);
    if(error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({ });
    res.render("listings/index.ejs", {allListings});
});


//New route 
app.get("/listings/new", (req, res) => {
    res.render("listings/form.ejs");
});


//Create route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
     
      // This grabs the entire object sent by the form
      const newListing = new Listing(req.body.listing); 
      await newListing.save();
      res.redirect("/listings"); 
})
);

//Show route for individual listing READ only
app.get("/listings/:id",wrapAsync(async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs" , {listing});
}));


//Edit route
app.get("/listings/:id/edit" ,wrapAsync(async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));


//Update route
app.put("/listings/:id", validateListing, wrapAsync(async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing} );   //deconstructed
    res.redirect(`/listings/${id}`);
}));


//Delete route
app.delete("/listings/:id", wrapAsync(async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing );
    res.redirect("/listings");
}));


//Reviews
//POST Review Route
app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));


//Delete Review Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res) => {
   let {id, reviewId} = req.params;
   await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
   await Review.findByIdAndUpdate(reviewId);

   res.redirect(`/listings/${id}`)
}))

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "PAGE not FOUND"));
})

//Error Handling
app.use((err, req, res, next) => {
    
    let {statusCode = 500, message = "Something went wrong"} = err;
    console.log(`Error ${statusCode}: ${message} at ${req.originalUrl}`);
    res.render("listings/error.ejs", {message});
    // res.status(statusCode).send(message)
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the centre of city",
//         price: 20000,
//         location: "Vancouver",
//         country: "Canada",
//     });

//     await sampleListing.save();

//     console.log('worked !');
//     res.send("listing worked in db");
// });


// app.post("/listings", async(req, res) => {
//     let {title, description, location, country, price} = req.body;
//     const newListing = new Listing({title, description, location, country, price});

//     await newListing.save();

//     res.redirect("/listings");
// });


//Create route
// app.post("/listings", async(req, res) => {
//     let {title, description, image, location, country, price} = req.body;
//     const newListing = new Listing({title, description, image, location, country, price});
    
//     //A try catch block for possible error
//     try {
//         await newListing.save();
//         res.redirect("/listings");
//     } catch (err) {
//         console.log(err);
//         res.send("An error occurred while saving.");
//     }
// });