const express=require('express');
const router=express.Router();
const patientControllers = require('./../controllers/patientController');
const authControllers=require('./../controllers/authController')
router.post('/signup',authControllers.signUp)
router.post('/login',authControllers.signIn)
router.route('/').get(patientControllers.getAllPatients).post(patientControllers.Addpatient)
router.route('/:id').get(patientControllers.getPatient).delete(patientControllers.deletePatient)
module.exports = router;