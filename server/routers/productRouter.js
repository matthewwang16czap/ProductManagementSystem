const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
    deleteProductsByUserId
} = require('../controllers/productController');

router.post('/user/product',createProduct)
router.get('/user/:id/products',getAllProducts)
router.get('/user/product/:id',getProductById)
router.put('/user/product:id',updateProduct)
router.get('/user/product/delete/:id',deleteProductById)
router.get('/user/:id/delete/products',deleteProductsByUserId)

module.exports = router;