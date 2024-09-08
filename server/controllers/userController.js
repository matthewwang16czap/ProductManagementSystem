const User = require('../models/User'); 

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.log(err.message);
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid user data' });
    else res.status(500).json({ message: err.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid user data' });
    else if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'invalid User ID' });
    else res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };