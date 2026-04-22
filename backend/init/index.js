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
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner:"69e7523a70c2711e95bdb49e"}));
    await Listing.insertMany(initData.data);
    console.log('data was initialized');
};

initDB();