const express = require('express');
const router = express.Router();
const User= require('../../Models/User');
const userHandler=  require('../handler/userHandler');
const isAuth = require('../../middleware/is-auth');

router.patch('/update/:userId',isAuth,userHandler.updateUser);
/**
* @desc Route to Update user data
* @route /user/update/:userId
* @type PATCH
* @access "USER/ORGANISER/ADMIN"
*/
router.get('/get/:userId',isAuth,userHandler.getUser);
/**
* @desc Route to Get user data
* @route /user/get/:userId
* @type GET
* @access "USER/ORGANISER/ADMIN"
*/
module.exports = router;