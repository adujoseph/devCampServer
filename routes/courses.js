const express = require('express');

const router = express.Router({ mergeParams: true });

const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses')

const { protect } = require('../middleware/auth');

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults')
// router.route('/radius/:zipcode/:distance')
//     .get(getBootcampsInRadius)

router.route('/')
    .get(advancedResults(Course,{
        path: 'bootcamp',
        select: 'name description'
    }),
    getCourses)
    .post(protect, createCourse)

router.route('/:id')
    .get(getCourseById)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse)

module.exports = router;