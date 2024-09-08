const express = require('express');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const CustomAPIError = require('../errors');
const router = express.Router();

// /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    let user = await Employee.findOne({ firstName });

    if (!user) {
      throw new CustomAPIError('Invalid Credentials', 400);
    }

    if (user.lastName !== lastName) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user._id
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
