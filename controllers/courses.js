const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(
    async (req, res, next) => {
        let query;

        if (req.params.bootcampId) {
            query = Course.find({ bootcamp: req.params.bootcampId })
        } else {
            query = Course.find()
        }

        const courses = await query;

        // if (!courses) {
        //     return next(new ErrorResponse(`Resource not found with id of `, 400))
        // }
        res.status(200).json({ success: true, count: courses.length, data: courses })

    }
)
// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
// exports.getBootcampById = asyncHandler(
//     async (req, res, next) => {

//         const bootcamp = await Bootcamp.findById(req.params.id)
//         if (!bootcamp) {
//             return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
//         }
//         res.status(200).json({ success: true, data: bootcamp })
//     }
// )

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
// exports.createBootcamp = asyncHandler(
//     async (req, res, next) => {
//         const bootcamp = await Bootcamp.create(req.body)
//         res.status(200).json(bootcamp);
//     }

// )
// @desc    Update single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
// exports.updateBootcamp = (
//     async (req, res, next) => {

//         const id = req.params.id
//         const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
//             new: true,
//             runValidators: true
//         })
//         if (!bootcamp) {
//             return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
//         }
//         res.status(200).json({ success: true, data: bootcamp });
//     }

// )
// @desc    Delete single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
// exports.deleteBootcamp = asyncHandler(
//     async (req, res, next) => {
//         const bootcamp = await Bootcamp.findByIdAndDelete(id)
//         if (!bootcamp) {
//             return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
//         }
//         res.status(200).json({ success: true, data: {} });
//     }
// )

// @desc    GET  bootcamp within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private 
// exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
//     const { zipcode, distance } = req.params;

//     // Get lat/lng from geocoder
//     const loc = await geocoder.geocode(zipcode);
//     const lat = loc[0].latitude;
//     const lng = loc[0].longitude;

//     // Calc radius using radians
//     // Divide dist by radius of Earth
//     // Earth Radius = 3,963 mi / 6,378 km
//     const radius = distance / 3963;

//     const bootcamps = await Bootcamp.find({
//         location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
//     });

//     res.status(200).json({
//         success: true,
//         count: bootcamps.length,
//         data: bootcamps
//     });
// });
