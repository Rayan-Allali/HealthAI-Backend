const express=require('express');
const router=express.Router();
const patientControllers = require('./../controllers/patientController');
const authControllers=require('./../controllers/authController')
const communicationsControllers=require('./../controllers/communicationsController');

router.post('/signup',authControllers.signUp)
router.post('/login',authControllers.signIn)
router.route('/').get(patientControllers.getAllPatients).post(patientControllers.Addpatient)
router.route('/:id').get(patientControllers.getPatient).delete(patientControllers.deletePatient)
router.use(authControllers.protectPatient)
router.route('/communications').get(communicationsControllers.getAllResponseForPatient).post(communicationsControllers.sendRequest)
router.route('/communications/:id').get(communicationsControllers.getRespond)
module.exports = router;