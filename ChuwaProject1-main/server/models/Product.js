const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  imageUrl: { type: String },
  thumbnailUrl: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
