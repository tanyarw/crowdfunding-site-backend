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
                return Promise.reject('Email already exists');}
            else{
                console.log('No matching Email');
            }
        });
        
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:8}),
    body('name').trim().not().isEmpty()
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
* @access "USER"
*/

module.exports = router;