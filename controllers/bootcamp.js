const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');



// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(
  async (req, res, next) => {
    // let query;

    // const reqQuery = {...req.query};

    // const removeFields = ['select', 'sort', 'page', 'limit'];
    // removeFields.forEach(param => delete reqQuery[param]);

    // let queryStr = JSON.stringify(reqQuery);
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // query = Bootcamp.find(JSON.parse(queryStr)).populate({
    //     path: 'courses'
    // });

    // if(req.query.select){
    //     const fields = req.query.select.split(',').join(' ');
    //     query = query.select(fields);
    // }


    // if(req.query.sort){
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     query = query.sort(sortBy);
    // } else {
    //    query = query.sort('-createdAt');
    // }


    // const page = parseInt(req.query.page, 10) || 1
    // const limit = parseInt(req.query.limit, 10) || 100
    // const startIndex = (page - 1)*limit
    // const endIndex = page * limit
    // const total = await Bootcamp.countDocuments(); 
    // query = query.skip(startIndex).limit(limit);




    // // console.log(queryStr)
    // const bootcamps = await query;

    // const pagination = {};

    // if(endIndex < total){
    //     pagination.next = {
    //         page: page +1,
    //         limit
    //     }
    // }

    // if(startIndex > 0){
    //     pagination.prev = {
    //         page: page -1,
    //         limit
    //     }
    // }
    //res.status(200).json({ success: true, count: bootcamps.length, pagination,   data: bootcamps })
    // next(err)
    res.status(200).json(res.advancedResults);
  }
);


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
);

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = asyncHandler(
  async (req, res, next) => {
    //add user to req object
    req.body.user = req.user.id

    //check for published bootcamp
    const published = await Bootcamp.findOne({ user: req.user.id })

    if (published && req.user.role !== "admin") {
      return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400))
    }

    const bootcamp = await Bootcamp.create(req.body)
    res.status(200).json(bootcamp);
  }

)
// @desc    Update single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(
  async (req, res, next) => {

    const id = req.params.id
    let bootcamp = await Bootcamp.findByIdAndUpdate(id);
    if (!bootcamp) {
      return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 400))
    }

    //make sure the user is owner of the bootcamp
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.params.id} not authorized`, 401))
    }
    bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({ success: true, data: bootcamp });
  }

)
// @desc    Delete single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }

    //make sure the user is owner of the bootcamp
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.params.id} not authorized`, 401))
    }
    bootcamp.remove();
    res.status(200).json({ success: true, data: {} });
  }
)

// @desc    GET  bootcamp within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private 
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});


// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  //make sure the user is owner of the bootcamp
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.params.id} not authorized`, 401))
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});