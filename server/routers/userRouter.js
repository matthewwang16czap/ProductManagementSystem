const express = require('express');
const router = express.Router();
const {
    createUser,
    getUserPublic,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const tokenAuth = require('../middlewares/tokenAuth');

router.get('/users/:userId', getUserPublic);    
router.put('/users/update', tokenAuth, updateUser);       
router.delete('/users/delete', tokenAuth, deleteUser);    
router.post('/users', createUser);                 

module.exports = router;