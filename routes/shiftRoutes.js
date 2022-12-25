const express=require('express');
const router=express.Router();
const shiftControllers = require('./../controllers/shiftController');

router.route('/').get(shiftControllers.getAllShifts).post(shiftControllers.AddShift)
router.route('/:id').get(shiftControllers.getShift).delete(shiftControllers.deleteShift)
router.route('/:date').get(shiftControllers.getShiftsByDate)
module.exports = router;