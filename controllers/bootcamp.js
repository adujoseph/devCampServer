// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next ) => {
    res.status(200).json({success: true, msg: 'Show all bootcamps'})
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcampById = (req, res, next ) => {
    res.status(200).json({success: true, msg: `Show bootcamp ${req.params.id}`})
}

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Public
exports.createBootcamp = (req, res, next ) => {
    res.status(200).json({success: true, msg: 'post all bootcamps'})
}

// @desc    Update single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = (req, res, next ) => {
    res.status(200).json({success: true, msg: `Edit bootcamp ${req.params.id}`})
}

// @desc    Delete single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = (req, res, next ) => {
    res.status(200).json({success: true, msg: `Deleted bootcamp ${req.params.id}`})
}


