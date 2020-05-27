const express = require('express');
const User = require('../models/User')
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

const { protect , authorize} = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'))

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router; 