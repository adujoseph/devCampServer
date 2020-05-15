const express = require('express');

const router = express.Router();

const { getBootcamps, getBootcampById, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamp')

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router.route('/:id')
    .get(getBootcampById)
    .put(updateBootcamp)
    .delete(deleteBootcamp)

module.exports = router;