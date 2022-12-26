
const express=require('express');
const router=express.Router();
const nurseControllers = require('./../controllers/nurseController');
const authControllers=require('./../controllers/authController');

router.post('/signup',authControllers.signUpNurse)
router.post('/login',authControllers.signInNurse)
router.use(authControllers.protectNurse)
router.route('/').get(nurseControllers.getAllNurses).post(nurseControllers.AddNurse)
router.route('/:id').get(nurseControllers.getNurse).delete(nurseControllers.deleteNurse)
module.exports = router;