const User = require('../models/User');
const Shop = require('../models/Shop'); 
const Product = require('../models/Product');

// get a shop by its id
const getShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.user.shop);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    // trace name, price, stock and thumbnailUrl for each item
    const returnItems = await Promise.all(
      shop.items.map(async item => {
        const product = await Product.findById(item.productId, 'name price stock thumbnailUrl');
        return {...item, ...product.toObject()};
      })
    );
    res.status(200).json(returnItems);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getShop
};