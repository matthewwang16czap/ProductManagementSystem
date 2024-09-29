const User = require("../models/User");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get a user cart by id from jwt token
// will update cart if quantity > stock
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.user.cart)
      .populate({
        path: "items.productId",
        model: "Product",
        select: "name price stock imageUrl",
      })
      .exec();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Loop over items to compare stock with quantity
    cart.items.forEach((item) => {
      const availableStock = item.productId.stock;

      // Update quantity if it's more than the stock
      if (item.quantity > availableStock) {
        item.quantity = availableStock;
      }
    });

    // filter out 0 quantity
    cart.items = cart.items.filter((item) => item.quantity);

    await cart.save();

    res.status(200).json(cart.items);
  } catch (err) {
    if (err.name === "CastError")
      res.status(400).json({ message: "Invalid user ID" });
    else res.status(500).json({ message: err.message });
  }
};

// Update a cart item by id from jwt token and productId and quantity
const updateCartItem = async (req, res) => {
  console.log(req.body);
  const { productId, quantity } = req.body;
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a positive integer" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cart = await Cart.findById(req.user.cart);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    // Check if the product is already in the cart
    const cartItem = cart.items.find(item => item.productId.toString() === productId);

    if (cartItem) {
      // Update the existing item's quantity
      cartItem.quantity = quantity;
    } else {
      // Add a new item to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    // return success
    res.status(200).json({ message: "Cart updated product", newCart: cart });
  } catch (err) {
    if (err.name === "CastError")
      res.status(400).json({ message: "Invalid user ID" });
    else res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  updateCartItem,
};
