const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const reviewRouter = require("./review.js");

const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
    

//============================NEW ROUTE============================
//Renders form to create new listing (only for logged-in users)
router.get(
    "/new",
    isLoggedIn,
    listingController.newForm
);


router
  .route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),   //  multer HERE
    validateListing,
    wrapAsync(listingController.updateListing) //  CONTROLLER HERE
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing )
  );


//============================EDIT ROUTE============================
// Renders edit form (only owner can access)
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


module.exports = router;


