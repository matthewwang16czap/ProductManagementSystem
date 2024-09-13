const express = require('express')
const router = express.Router();

const {getCart,
    updateCartItem,
} = require('../controllers/cartController');

const tokenAuth = require('../middlewares/tokenAuth');

router.get('/users/cart', tokenAuth, getCart);
router.put('/users/cart', tokenAuth, updateCartItem);

module.exports = router;
