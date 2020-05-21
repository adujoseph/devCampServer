const express = require('express');

const router = express.Router({ mergeParams: true });

const {
    getCourses,
    getCourseById,
    createCourse
} = require('../controllers/courses')

// router.route('/radius/:zipcode/:distance')
//     .get(getBootcampsInRadius)

router.route('/')
    .get(getCourses)
    .post(createCourse)

router.route('/:id')
    .get(getCourseById)

module.exports = router;