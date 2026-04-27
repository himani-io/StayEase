const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userControllers = require("../controllers/users.js");

// ===================== SIGNUP ROUTES =====================
// Render signup form
router
    .route("/signup")
    .get(userControllers.renderSignUpForm)
    .post(
       wrapAsync(userControllers.registerUser)
    );


// ===================== LOGIN ROUTES =====================
// Render login form

router
    .route("/login")
    .get(userControllers.renderLoginForm )
    .post(
      saveRedirectUrl,
      passport.authenticate("local", {
        failureRedirect:"/login", 
        failureFlash: true,
      }), 
      userControllers.loginUser
    );

    
// ===================== LOGOUT ROUTE =====================
//Handle logout
router.get(
    "/logout", 
    userControllers.logoutUser
);

module.exports = router;