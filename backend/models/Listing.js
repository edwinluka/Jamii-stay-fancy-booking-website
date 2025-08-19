// backend/models/Listing.js
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    type: { type: String, enum: ["apartment", "house", "villa", "room"], default: "apartment" },
    price: { type: Number, required: true },
    image: { type: String }, // will store filename from multer
    availabilityDates: [{ type: Date }],
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
