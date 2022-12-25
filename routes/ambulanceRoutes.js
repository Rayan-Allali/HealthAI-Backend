const express=require('express');
const router=express.Router();
const ambulanceControllers = require('./../controllers/ambulanceController');

router.route('/').get(ambulanceControllers.getAllAmbulances).post(ambulanceControllers.AddAmbullance)
router.route('/:id').get(ambulanceControllers.getAmbulance)
module.exports = router;