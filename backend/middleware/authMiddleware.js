// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes and attach user to req
const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) return res.status(401).json({ message: 'User not found' });

      next();
    } else {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Allow only guests
const guestOnly = (req, res, next) => {
  if (req.user.role !== 'guest') {
    return res.status(403).json({ message: 'Access restricted to guests only' });
  }
  next();
};

// Allow only hosts
const hostOnly = (req, res, next) => {
  if (req.user.role !== 'host') {
    return res.status(403).json({ message: 'Access restricted to hosts only' });
  }
  next();
};

module.exports = { protect, guestOnly, hostOnly };
