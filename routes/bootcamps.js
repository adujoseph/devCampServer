const express = require('express');

const router = express.Router();

const { 
    getBootcamps, 
    getBootcampById, 
    createBootcamp, 
    updateBootcamp, 
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
 } = require('../controllers/bootcamp')

 const advanceResults = require('../middleware/advancedResults');

 const Bootcamp = require('../models/Bootcamp');

 const { protect } = require('../middleware/auth');

 //include other resource router
 const courseRouter = require('./courses');

 // Re-route into other resource router
 router.use('/:bootcampId/courses', courseRouter);

 
router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/:id/photo')
    .put( protect , bootcampPhotoUpload )

router.route('/')
    .get(advanceResults(Bootcamp, 'courses'),getBootcamps)
    .post(protect ,createBootcamp)

router.route('/:id')
    .get(getBootcampById)
    .put(protect ,updateBootcamp)
    .delete(protect ,deleteBootcamp)

module.exports = router;