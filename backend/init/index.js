const mongoose = require('mongoose');
const initData = require("./data.js");                // "." means same folder (init)
const Listing = require("../models/listing.js");  //".." means go up to phase1a, then into models

main().then(() => {
    console.log("connection success !");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/stayease");
}

const initDB = async () => {
    await Listing.deleteMany({});

    // This part ensures EVERY listing has the correct object structure
    // even if your data.js file has the old format
    // const processedData = initData.data.map((obj) => ({
    //     ...obj,
    //     image: {
    //         url: obj.image, // Converts the string URL to the object format
    //         filename: "listingimage"
    //     }
    // }));
    
    await Listing.insertMany(initData.data);
    console.log('data was initialized');
};

initDB();