const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.get('/users/:id', getUserById);     
router.put('/users/:id', updateUser);       
router.delete('/users/:id', deleteUser);    

router.post('/users', createUser);         
router.get('/users', getAllUsers);          

module.exports = router;