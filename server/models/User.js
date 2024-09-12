const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['regular', 'admin'], default: 'regular' }, // 'regular' or 'admin'
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: false, default: null },
  shop: { type: Schema.Types.ObjectId, ref: "Shop", required: false, default: null },
});

const User = mongoose.model('User', userSchema);
module.exports = User;