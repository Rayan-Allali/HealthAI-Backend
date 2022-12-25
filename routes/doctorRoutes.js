const express=require('express');
const router=express.Router();
const doctorControllers = require('./../controllers/doctorController');
const authControllers=require('./../controllers/authController');
router.route('/').get(doctorControllers.getAllDoctors).post(doctorControllers.AddDoctor)
router.route('/:id').get(doctorControllers.getDoctor).delete(doctorControllers.deleteDoctor)
module.exports = router;