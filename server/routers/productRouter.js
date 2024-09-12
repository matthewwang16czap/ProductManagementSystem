const express = require('express');
const router = express.Router();

const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const tokenAuth = require('../middlewares/tokenAuth');

router.get('/products/:productId', getProduct);
router.post('/products', tokenAuth, createProduct);
router.put('/products/:productId', tokenAuth, updateProduct);
router.delete('/products/:productId', tokenAuth, deleteProduct);

module.exports = router;