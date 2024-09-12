const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: {
    type: [{
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      }],
    default: [],
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
