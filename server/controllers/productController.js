const Product = require('../models/Product'); 

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    console.log(err.message);
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid product data' });
    else res.status(500).json({ message: err.message });
  }
};

// Get all products of user
const getAllProducts = async (req, res) => {
  try {
    const userId = req.params.id
    const products = await Product.find({userId: userId});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    if (err.name === 'ValidationError') res.status(400).json({ message: 'Invalid product data' });
    else if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};


// Delete a products by userId
const deleteProductById = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
      if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
      else res.status(500).json({ message: err.message });
    }
};


// Delete a products by userId
const deleteProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedProducts = await Product.findByIdAndDelete({userId:userId});
    if (!deletedProducts) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
    deleteProductsByUserId
  };