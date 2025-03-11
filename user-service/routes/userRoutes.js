const express = require('express');
const { createUser, getUserById, updateUser } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);

module.exports = router;