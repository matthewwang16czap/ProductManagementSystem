const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})$/.test(password);
      },
      message: 'Password must be at least 8 characters long and contain combinations of numbers and characters',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address',
    },
  },
  role: { type: String, enum: ['regular', 'admin'], required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart', default: null },
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', default: null },
});

const User = mongoose.model('User', userSchema);
module.exports = User;