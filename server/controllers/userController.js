const User = require('../models/User'); 
const Cart = require('../models/Cart'); 
const Shop = require('../models/Shop'); 

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    if (req.body.role === "regular") {
      // create a cart for the user
      const newCart = new Cart({userId: newUser._id});
      await newCart.save();
      // save the cart id to user
      await newUser.updateOne({cart: newCart._id});
    }
    else if (req.body.role === "admin") {
      // create a shop for the user
      const newShop = new Shop({userId: newUser._id});
      await newShop.save();
      // save the shop id to user
      await newUser.updateOne({cart: newShop._id});
    }
    // return success
    res.status(201).json({ message: 'User created', newUser: newUser });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid user data' });
    else res.status(500).json({ message: err.message });
  }
};

// Get a single user by userId, without private info
const getUserPublic = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, 'username role shop');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Update a user by userId from jwt token
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated', updatedUser: updatedUser});
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid user data' });
    else if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Delete a user by ID from jwt token
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    // delete cart or shop as well
    if (deletedUser.role === "regular") await Cart.findByIdAndDelete(deletedUser.cart);
    else if (deletedUser.role === "admin") await Shop.findByIdAndDelete(deletedUser.shop);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'invalid User ID' });
    else res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createUser,
    getUserPublic,
    updateUser,
    deleteUser,
  };