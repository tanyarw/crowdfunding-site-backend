const express = require('express');
const router = express.Router();
const hackedHandler=  require('../handler/hackedHandler');

router.get('/getHacks',hackedHandler.getHacked);

/**
* @desc Route to get all websites that have been hacked
* @route /hacked/getHacks
* @type GET
* @access "PUBLIC"
*/

module.exports = router;