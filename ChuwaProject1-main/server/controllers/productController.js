const User = require('../models/User'); 
const Product = require('../models/Product'); 
const Shop = require('../models/Shop'); 

// Create a new product by userId from jwt token
const createProduct = async (req, res) => {
  try {
    // verify shop
    const shop = await Shop.findById(req.user.shop);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    // add userId from jwt
    const newProduct = new Product({...req.body, userId: req.user.id});
    await newProduct.save();
    // add to creater's shop as well
    shop.items.push({ productId: newProduct._id });
    await shop.save();
    // return success
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid product data' });
    else res.status(500).json({ message: err.message });
  }
};

// Get a single product by productId
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const skip = (page - 1) * limit;
    const products = await Product.find().select('name price stock thumbnailUrl').limit(limit).skip(skip);
    const count = await Product.countDocuments();
    console.log(count)
    res.status(200).json({products:products, count: count});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product by productId and userId from jwt token 
const updateProduct = async (req, res) => {
  try {
    // verify user is seller
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Operation forbidden" });
    // update product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.productId, userId: req.user.id }, 
      req.body, 
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid product data' });
    else if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Delete a products by productId and userId from jwt token 
const deleteProduct = async (req, res) => {
    try {
      // verify shop
      const shop = await Shop.findById(req.user.shop);
      if (!shop) return res.status(404).json({ message: 'Shop not found' });
      // delete product
      const deletedProduct = await Product.findOneAndDelete(
        {_id: req.params.productId, userId: req.user.id}
      );
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      // delete in creater's shop as well
      shop.items.pull({ productId: deletedProduct._id });
      shop.save();
      // return success
      res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
      if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
      else res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
  };