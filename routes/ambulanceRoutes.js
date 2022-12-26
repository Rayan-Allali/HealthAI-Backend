const express=require('express');
const router=express.Router();
const ambulanceControllers = require('./../controllers/ambulanceController');
const authControllers=require('./../controllers/authController');

router.post('/signup',authControllers.signUpAmbulance)
router.post('/login',authControllers.signInAmbulance)
router.use(authControllers.protectAmbulance)
router.route('/').get(ambulanceControllers.getAllAmbulances).post(ambulanceControllers.AddAmbullance)
router.route('/:id').get(ambulanceControllers.getAmbulance)
module.exports = router;