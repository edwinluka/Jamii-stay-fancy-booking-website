const express = require('express');
const path = require('path');
const multer = require('multer');
const Listing = require('../models/Listing');
const { protect, hostOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup for single image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ------------------ Handlers ------------------ //

// CREATE listing (Host only)
const createListing = async (req, res) => {
  try {
    const { title, description, location, type, price, availabilityDates } = req.body;

    if (!title || !location || !price) {
      return res.status(400).json({ message: 'Title, location and price are required' });
    }

    const image = req.file ? req.file.filename : '';
    let parsedDates = [];
    if (availabilityDates) {
      try {
        parsedDates = Array.isArray(availabilityDates) ? availabilityDates : JSON.parse(availabilityDates);
      } catch {
        parsedDates = [];
      }
    }

    const listing = await Listing.create({
      title,
      description,
      location,
      type,
      price: Number(price),
      image,
      host: req.user._id,
      availabilityDates: parsedDates
    });

    res.status(201).json({ message: 'Listing created', listing });
  } catch (err) {
    console.error('Create listing error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET all listings (public, with optional filters)
const getListings = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice, q } = req.query;
    const filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { location: new RegExp(q, 'i') }
      ];
    }
    const listings = await Listing.find(filter).populate('host', 'name email role');
    res.json(listings);
  } catch (err) {
    console.error('Get listings error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single listing
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'name email role');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    console.error('Get listing error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE listing (Host only & must own it)
const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not your listing' });
    }

    const fields = ['title', 'description', 'location', 'type', 'price', 'availabilityDates'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        listing[f] = f === 'price' ? Number(req.body[f]) : req.body[f];
      }
    });

    if (req.body.availabilityDates) {
      try {
        listing.availabilityDates = Array.isArray(req.body.availabilityDates)
          ? req.body.availabilityDates
          : JSON.parse(req.body.availabilityDates);
      } catch {}
    }

    if (req.file) listing.image = req.file.filename;

    await listing.save();
    res.json({ message: 'Listing updated', listing });
  } catch (err) {
    console.error('Update listing error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE listing (Host only & must own it)
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not your listing' });
    }
    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    console.error('Delete listing error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------ Routes ------------------ //
router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', protect, hostOnly, upload.single('image'), createListing);
router.put('/:id', protect, hostOnly, upload.single('image'), updateListing);
router.delete('/:id', protect, hostOnly, deleteListing);

module.exports = router;
