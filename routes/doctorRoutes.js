const express=require('express');
const router=express.Router();
const doctorControllers = require('./../controllers/doctorController');
const authControllers=require('./../controllers/authController');
const communicationsControllers=require('./../controllers/communicationsController');

router.post('/signup',authControllers.signUpDoctor)
router.post('/login',authControllers.signInDoctor)
router.use(authControllers.protectDoctor)
router.route('/').get(doctorControllers.getAllDoctors).post(doctorControllers.AddDoctor)
router.route('/:id').get(doctorControllers.getDoctor).delete(doctorControllers.deleteDoctor)

router.route('/communications').get(communicationsControllers.getAllRequestForDoctor).post(communicationsControllers.sendResponse)
router.route('/communications/:id').get(communicationsControllers.getRequest)

module.exports = router;