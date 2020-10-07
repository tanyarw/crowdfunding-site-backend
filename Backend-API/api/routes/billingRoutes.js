const express = require('express');
const isAuth = require('../../middleware/is-auth');
const {body} = require('express-validator');
const { Promise } = require('mongoose');
const router = express.Router();
const billingHandler=  require('../handler/billingHandler');

router.post('/:fundId',isAuth,billingHandler.makePayment);

/**
* @desc Route to make payment to a fun
* @route /bill/:fundId
* @type POST
* @access "USER/ORGANISER/ADMIN"
*/

router.get('/myBills',isAuth,billingHandler.getAllbillsbyUID);
/**
* @desc Route to get all the bills of a particular user
* @route /bill/myBills
* @type POST
* @access "USER/ORGANISER/ADMIN"
*/

router.get('/myFundBills/:fundId',isAuth,billingHandler.getAllbillsbyFID);
/**
* @desc Route to get all the bills of a particular fund and the total funds
* @route /bill/myFundBills/:fundId
* @type POST
* @access "ORGANISER/ADMIN"
*/
router.get('/myFundCollection/:fundId',isAuth,billingHandler.getOfaFID);
/**
* @desc Route to get total collection a particular fund
* @route /bill/myFundCollection/:fundId
* @type POST
* @access "ORGANISER/ADMIN"
*/
module.exports = router;