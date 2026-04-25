// 1. Load environment variables from the parent folder
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN; // Hardcode it here for the script or use dotenv
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayease");
  console.log("connection success !");
  await initDB();
}

const initDB = async () => {
  await Listing.deleteMany({});

 const updatedData = await Promise.all(initData.data.map(async (obj) => {
        let response = await geocodingClient.forwardGeocode({
            query: obj.location,
            limit: 1,
        }).send();

        return {
            ...obj,
            owner: "69e7523a70c2711e95bdb49e",
            // If Mapbox finds the location, use it. Otherwise, fallback to Delhi.
            geometry: response.body.features.length 
                ? response.body.features[0].geometry 
                : { type: "Point", coordinates: [77.209, 28.6139] }
        };
    }));

  await Listing.insertMany(updatedData);

  console.log("data was initialized");
};

main().catch(console.log);