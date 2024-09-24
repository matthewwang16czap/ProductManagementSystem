const express = require('express');
const router = express.Router();
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const tokenAuth = require('../middlewares/tokenAuth');

router.get('/users', tokenAuth, getUser);    
router.put('/users/update', tokenAuth, updateUser);       
router.delete('/users/delete', tokenAuth, deleteUser);    
router.post('/users', createUser);                 

module.exports = router;