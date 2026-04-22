const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

//Get route for the signup page
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

//Post route for posting the data to db
router.post("/signup" , wrapAsync(async(req, res, next) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(req.body);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to StayEase");
        res.redirect("/listings");
        });
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signUp");
    }
}));

//Login route
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

//post route
router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect:"/login", failureFlash: true,
}), 
    async(req, res) => {
    req.flash("success", "Welcome back to StayEase! You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
});

//logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out now")
        res.redirect("/listings");
    });
})
module.exports = router;