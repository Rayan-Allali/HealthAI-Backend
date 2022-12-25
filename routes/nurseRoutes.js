
const express=require('express');
const router=express.Router();
const nurseControllers = require('./../controllers/nurseController');

router.route('/').get(nurseControllers.getAllNurses).post(nurseControllers.AddNurse)
router.route('/:id').get(nurseControllers.getNurse).delete(nurseControllers.deleteNurse)
module.exports = router;