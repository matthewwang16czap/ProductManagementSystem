const express = require('require')
const router = express.Router();

const {createCart,
    getAllProductsOfCart,
    getCartById,
    updateCartByProduct,
    deleteCartByUserId  } = require('../controllers/cartController');


router.post('/user/cart',createCart)
router.get('/user/:id/cart/products',getAllProductsOfCart,)
router.get('/user/:id/cart',getCartById,)
router.put('/user/:id/cart/product',updateCartByProduct)
router.get('/user/:id/delete/cart',deleteCartByUserId)

module.exports = router;
