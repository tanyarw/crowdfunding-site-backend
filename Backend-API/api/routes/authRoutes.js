const express = require('express');

const {body} = require('express-validator');
const { Promise } = require('mongoose');
const router = express.Router();
const User = require('../../Models/User');
const authHandler=  require('../handler/authHandler')



router.post('/signUp',[
    body('email')
    .isEmail()
    .withMessage('Please Enter Valid Email')
    .custom((value,{req})=>{
        return User.findOne({email : value})
        .then(userDoc=>{
            if(userDoc){
               
                    const error = new Error('Email already exists');
                    error.statusCode = 422;
                    throw error;

            
            }else{
                console.log('No matching Email');
            }
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
        
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:8}),
    body('name').trim().not().isEmpty(),
    body('role').not().isEmpty()
],
    authHandler.signup
);
/**
* @desc Route to signup
* @route /auth/signup
* @type POST
* @access "PUBLIC"
*/

router.post('/login',authHandler.login);

/**
* @desc Route to login
* @route /auth/login
* @type POST
* @access "PUBLIC"
*/

module.exports = router;