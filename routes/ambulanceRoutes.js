const express=require('express');
const router=express.Router();
const ambulanceControllers = require('./../controllers/ambulanceController');
const authControllers=require('./../controllers/authController');
router.route('/').get(authControllers.protect,ambulanceControllers.getAllAmbulances).post(authControllers.protect,ambulanceControllers.AddAmbullance)
router.route('/:id').get(authControllers.protect,ambulanceControllers.getAmbulance)
module.exports = router;