const express = require('express')
const router = express.Router();

const {getShop,
} = require('../controllers/shopController');

const tokenAuth = require('../middlewares/tokenAuth');

router.get('/users/shop', tokenAuth, getShop);

module.exports = router;
