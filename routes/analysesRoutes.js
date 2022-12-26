const express=require('express');
const router=express.Router();
const analyseControllers = require('./../controllers/analyseControllers');
const authControllers=require('./../controllers/authController');

router.route('/:type').get(analyseControllers.getAllAnalyses).post(ambulanceControllers.addAnalyse)
router.route('/:id').get(analyseControllers.getAnalyse)
module.exports = router;