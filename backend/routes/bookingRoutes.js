const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { protect, guestOnly } = require("../middleware/authMiddleware");

// ✅ Create booking
router.post("/", protect, guestOnly, async (req, res) => {
  try {
    const { listing, checkIn, checkOut } = req.body;

    if (!listing || !checkIn || !checkOut) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = new Booking({
      listing,
      user: req.user._id, // ✅ attach logged-in user
      checkIn,
      checkOut,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

// ✅ Get current user's bookings
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

module.exports = router;
