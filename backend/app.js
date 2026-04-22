const express =require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  

const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


// ===================== VIEW ENGINE SETUP =====================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);


// ===================== MIDDLEWARE =====================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));


// ===================== DATABASE CONNECTION =====================
main().then(() => {
    console.log("connection success !");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/stayease");
}


// ===================== SERVER =====================
const port = 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// ===================== SESSION CONFIGURATION =====================
const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());


// ===================== PASSPORT AUTH SETUP =====================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// ===================== GLOBAL VARIABLES =====================
// Makes flash messages & current user available in all views
app.use((req, res, next) => {
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
   next();
})


// ===================== ROUTES =====================

//Home Route
app.get("/", (req, res) => {
   res.render("listings/index.ejs");
});

//Main Routes
app.use("/listings", listingRouter );
app.use("/listings/:id/reviews", reviewRouter );
app.use("/", userRouter );


// ===================== MISC =====================
// Prevent favicon error
app.get('/favicon.ico', (req, res) => res.status(204).end());


// ===================== 404 HANDLER =====================
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "PAGE not FOUND"));
});


// ===================== ERROR HANDLER =====================
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;

    console.log(`Error ${statusCode}: ${message} at ${req.originalUrl}`);

    res.render("listings/error.ejs", {message});
});
