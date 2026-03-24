const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const port = 8080;

const MONGO_URL = 'mongodb://127.0.0.1:27017/stayease';

main().then(() => {
    console.log("connection successful !");
}).catch((err) => {
    console.log(err);
}); 

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.listen(port, () => {
    console.log(`server is litening at ${port}`);
}); 

app.get("/", (req, res) => {
    res.send('get req working');
});

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title : "My new villa",
        description: "In the central city",
        price: 50000,
        location: "Shamli, UP",
        country: "India",
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
});