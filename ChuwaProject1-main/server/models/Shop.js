const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }],
    default: [],
  },
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
