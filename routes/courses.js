const express = require('express');

const router = express.Router({mergeParams: true});

const { 
    getCourses, 
 } = require('../controllers/courses')

// router.route('/radius/:zipcode/:distance')
//     .get(getBootcampsInRadius)

router.route('/')
    .get(getCourses)
   

// router.route('/:id')
//     .get(getBootcampById)
//     .put(updateBootcamp)
//     .delete(deleteBootcamp)

module.exports = router;