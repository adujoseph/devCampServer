const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(
    async (req, res, next) => {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({ success: true, data: bootcamps })
        // next(err)
    }
)
// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcampById = asyncHandler(
    async (req, res, next) => {

        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data: bootcamp })
    }
)

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = asyncHandler(
    async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(200).json(bootcamp);
    }

)
// @desc    Update single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (
    async (req, res, next) => {

        const id = req.params.id
        const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!bootcamp) {
            return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data: bootcamp });
    }

)
// @desc    Delete single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id
        const bootcamp = await Bootcamp.findByIdAndDelete(id)
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data: {} });
    }
)


