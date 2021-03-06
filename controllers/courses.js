const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');



// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(
    async (req, res, next) => {
        if (req.params.bootcampId) {
            const courses = await Course.find({ bootcamp: req.params.id });

            return res.status(200).json({
                success: true,
                count: courses.length,
                data: courses
            });
        } else {
            res.status(200).json(res.advancedResults)
        }
        //     let query;

        //     if (req.params.bootcampId) {
        //         query = Course.find({ bootcamp: req.params.bootcampId })
        //     } else {
        //         query = Course.find().populate({
        //             path: 'bootcamp',
        //             select: ['name', 'description']
        //         })
        //     }

        //     const courses = await query;
        //     res.status(200).json({ success: true, count: courses.length, data: courses })

    }
)



// @desc    Get a single course
// @route   GET /api/v1/course/:id
// @access  Public
exports.getCourseById = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if (!course) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
    }
    res.status(200).json({ success: true, data: course })
});



// @desc    Create a single course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.bootcampId}`, 400))
    }
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} not authorized`, 401))
    }

    const course = await Course.create(req.body)
    res.status(200).json({ success: true, data: course })
});


// @desc    Update a single course
// @route   PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id)
    if (!course) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
    }
    //only course owner validation
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} not authorized`, 401))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ success: true, data: course })
});


// @desc    Delete a  course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Resource not found with id of ${req.params.Id}`, 400))
    }
    //only course owner validation
    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} not authorized`, 401))
    }


    await course.remove();
    res.status(200).json({ success: true, data: {} })
});
