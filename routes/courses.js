const express = require('express');

const router = express.Router({ mergeParams: true });

const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses')

const { protect, authorize } = require('../middleware/auth');

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
    .post(protect, authorize('publisher','admin'), createCourse)

router.route('/:id')
    .get(getCourseById)
    .put(protect, authorize('publisher','admin'), updateCourse)
    .delete(protect,authorize('publisher','admin'), deleteCourse)

module.exports = router;