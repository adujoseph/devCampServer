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

 const { protect, authorize } = require('../middleware/auth');

 //include other resource router
 const courseRouter = require('./courses');
 const reviewRouter = require('./reviews');

 // Re-route into other resource router
 router.use('/:bootcampId/courses', courseRouter);
 router.use('/:bootcampId/reviews', reviewRouter);

 
router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/:id/photo')
    .put( protect, authorize('publisher','admin') , bootcampPhotoUpload )

router.route('/')
    .get(advanceResults(Bootcamp, 'courses'),getBootcamps)
    .post(protect, authorize('publisher','admin') ,createBootcamp)

router.route('/:id')
    .get(getBootcampById)
    .put(protect,authorize('publisher', 'admin') ,updateBootcamp)
    .delete(protect , authorize('publisher','admin'),deleteBootcamp)

module.exports = router;