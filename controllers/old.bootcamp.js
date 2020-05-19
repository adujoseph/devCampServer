const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find()
        res.status(200).json({ success: true, data: bootcamps })
    } catch (err) {
        next(err)
    }

}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcampById = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            return  next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (err) {
        next(err)
    }


}

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(200).json(bootcamp);
    } catch (err) {
        next(err)
    }
}

// @desc    Update single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const id = req.params.id
        const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if(!bootcamp){
            return  next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data:  bootcamp });
    } catch (err) {
        next(err)
    }
}

// @desc    Delete single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const id = req.params.id
        const bootcamp = await Bootcamp.findByIdAndDelete(id)
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
        }
        res.status(200).json({ success: true, data:  {} });
    } catch (err) {
        next(err)
    }
}


