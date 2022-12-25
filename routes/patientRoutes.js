const express=require('express');
const router=express.Router();
const patientControllers = require('./../controllers/patientController');

router.route('/').get(patientControllers.getAllPatients).post(patientControllers.Addpatient)
router.route('/:id').get(patientControllers.getPatient).delete(patientControllers.deletePatient)
module.exports = router;