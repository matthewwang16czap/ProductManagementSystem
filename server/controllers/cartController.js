const User = require('../models/User'); 
const Cart = require('../models/Cart'); 
const Product = require('../models/Product'); 

// Get a user cart by id from jwt token
// will update cart if quantity > stock
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.user.cart);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    // trace name, price, stock and thumbnailUrl for each item
    const returnItems = await Promise.all(
      cart.items.map(async item => {
        const product = await Product.findById(item.productId, 'name price stock thumbnailUrl');
        return {...item, ...product.toObject()};
      })
    );
    // update quantity refer to stock
    cart.items = cart.items.map((item, idx) => 
      ({...item, quantity: Math.min(item.quantity, returnItems[idx].stock)})
    );
    await cart.save();
    returnItems = returnItems.map(item => 
      ({...item, quantity: Math.min(item.quantity, item.stock)})
    );
    res.status(200).json(returnItems);
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
    else res.status(500).json({ message: err.message });
  }
};

// Update a cart item by id from jwt token and productId and quantity
const updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findById(req.user.cart);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    // get item to be updated
    const existingItem = cart.items.find(item => item.productId.toString() === req.body.productId);
    if (existingItem) {
      if ('quantity' in existingItem) {
        // update quantity if product exists in the cart
        // when quantity=0 it pruely means out of stock
        existingItem.quantity = req.body.quantity;
      }
      else {
        // if no quantity provided, remove it
        cart.items.pull({ productId: req.body.productId });
      }
    } 
    else {
      // add new item to the cart
      cart.items.push({ productId: req.body.productId, quantity: req.body.quantity });
    }
    await cart.save();
    // return success
    res.status(200).json({ message: 'Cart updated product', newCart: cart });
  } catch (err) {
    if (err.name === 'CastError') res.status(400).json({ message: 'Invalid user ID' });
    else res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  updateCartItem,
};