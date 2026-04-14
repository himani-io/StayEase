const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const review = require("./reviews.js");

const listingSchema = new Schema({
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
    filename: {
    type: String,
    default: "listingimage",
  },
  url: {
    type: String,
    // This default only kicks in if 'url' is missing entirely
    default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    // This 'set' logic is great—it catches users sending an empty string "" from a form
    set: (v) => v === "" 
      ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" 
      : v,
    },
  },

    price: {
      type: Number,
    },

    location: {
      type: String,
    },

    country: {
      type: String,
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review", 
      }
    
    ]
});

listingSchema.post("findOneAndDelete", async(listing) => {
   if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}})
   }
})
   

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;