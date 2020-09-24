const express = require('express');
const router = express.Router();
const User= require('../../Models/User');
const userHandler=  require('../handler/userHandler');
const isAuth = require('../../middleware/is-auth');

router.patch('/update/:userId',isAuth,userHandler.updateUser);
/**
* @desc Update Fundraiser data
* @route /fundraiser/update/:fundId
* @type PATCH
* @access "USER"
*/

module.exports = router;