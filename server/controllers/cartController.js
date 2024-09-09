const Cart = require('../models/Cart'); 

// Create a new cart
const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(201).json({ message: 'Cart created' });
  } catch (err) {
    console.log(err.message);
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid cart data' });
    else res.status(500).json({ message: err.message });
  }
};

// Get all products of user
const getAllProductsOfCart = async (req, res) => {
  try {
    const userId = req.params.id
    const cart = await Cart.find({userId: userId});
    const products = cart.items
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
const getCartById = async (req, res) => {
  try {
    const userId = req.params.id
    const cart = await Cart.find({userId: userId});
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid cart ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Update a cart by ID
const updateCartByProduct = async (req, res) => {
  try {
    const userId = req.params.id
    const {productId, quantity} = await req.body 
    const updatedCart= await Cart.findByIdAndUpdate(userId);
    if (!updatedCart) return res.status(404).json({ message: 'Cart not found' });
    // 
    if (!productId in updatedCart.items){
      updatedCart.items.push((productId, quantity))
    }else{
      updatedCart.items[productId] = quantity
    }
    await updatedCart.save()

    res.status(200).json({ message: 'Cart add product' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid product data' });
    else if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};


// Delete a products by userId
const deleteCartByUserId = async (req, res) => {
    try {
      const userId = req.params.id
      const cart = await Cart.findByIdAndDelete({userId: userId});
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      res.status(200).json({ message: 'Cart deleted' });
    } catch (err) {
      if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
      else res.status(500).json({ message: err.message });
    }
};




module.exports = {
  createCart,
  getAllProductsOfCart,
  getCartById,
  updateCartByProduct,
  deleteCartByUserId  
};