const express = require('express');
const isAuth = require('../../middleware/is-auth');
const {body} = require('express-validator');
const { Promise } = require('mongoose');
const router = express.Router();
const billingHandler=  require('../handler/billingHandler');

router.post('/:fundId',isAuth,billingHandler.makePayment);

/**
* @desc Route to login
* @route /auth/login
* @type POST
* @access "PUBLIC"
*/
module.exports = router;