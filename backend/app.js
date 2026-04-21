const express =require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  
const ExpressError = require("./utils/ExpressError.js");
//Express Router 
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require('express-session');
const flash = require('connect-flash');

//seting engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));

//Database
main().then(() => {
    console.log("connection success !");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/stayease");
}

const port = 8080;
//Port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.get("/", (req, res) => {
   res.render("listings/index.ejs");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   console.log(res.locals.success);
   next();
})


//Requiring from route folder
app.use("/listings", listings );
app.use("/listings/:id/reviews", reviews )

//random route
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
