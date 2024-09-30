const User = require('../models/User');
const Shop = require('../models/Shop'); 
const Product = require('../models/Product');

// get a shop by its id
const getShop = async (req, res) => {
  try {
    // Find the shop and populate product for each item
    const shop = await Shop.findById(req.user.shop)
      .populate({
        path: 'items.productId',
        model: 'Product',
        select: 'name price stock imageUrl',
      })
      .exec();

    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    res.status(200).json(shop.items);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid product ID' });
    else res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getShop
};