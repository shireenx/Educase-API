
const express=require('express');
const {addSchool, getSchool} =require('../controllers/apiController')
const router=express.Router();

router.post('/addSchool',addSchool);
router.get("/listSchools/:lat/:lng",getSchool)
module.exports=router;