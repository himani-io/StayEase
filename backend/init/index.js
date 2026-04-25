const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/stayease");
  console.log("connection success !");
  await initDB();
}

const initDB = async () => {
  await Listing.deleteMany({});

  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "69e7523a70c2711e95bdb49e"
  }));

  await Listing.insertMany(updatedData);

  console.log("data was initialized");
};

main().catch(console.log);