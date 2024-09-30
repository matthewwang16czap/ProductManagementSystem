const express = require('express')
const router = express.Router();

const {getCart,
    updateCartItem,
    checkOut,
} = require('../controllers/cartController');

const tokenAuth = require('../middlewares/tokenAuth');

router.get('/users/cart', tokenAuth, getCart);
router.put('/users/cart', tokenAuth, updateCartItem);
router.post('/users/cart/checkout', tokenAuth, checkOut);

module.exports = router;
