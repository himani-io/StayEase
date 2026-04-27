const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");


module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};


module.exports.registerUser = async(req, res, next) => {
    
    try{
        // Extract user details from request body
        let {username, email, password} = req.body;

        // Create new user instanc 
        const newUser = new User({email, username});
 
        // Register user with hashed password (passport-local-mongoose)
        const registeredUser = await User.register(newUser, password);

        console.log(req.body);

        // Automatically log in user after signup
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
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.loginUser = async(req, res) => {
    // On successful login
    req.flash("success", "Welcome back !");

    // Redirect to original page or listings
    let redirectUrl = res.locals.redirectUrl || "/listings";
    
    if (redirectUrl.includes("/reviews")) {
      redirectUrl = redirectUrl.split("/reviews")[0];
    }
    
    res.redirect(redirectUrl);
};




module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        } 

        req.flash("success", "You are logged out now")
        res.redirect("/listings");
    });
}






