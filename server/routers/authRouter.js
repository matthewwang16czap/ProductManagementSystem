const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomAPIError = require('../errors');
const router = express.Router();

// /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username, password: password });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    const payload = {
      user: {
        id: user._id,
        role: user.role,
        cart: user.user,
        shop: user.shop
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });   
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
