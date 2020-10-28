const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User');
const { validationResult } = require('express-validator');

exports.updateUser = async (req, res, next) => {
    const userId= req.params.userId;
    const tabuserId= req.userId;
    console.log(userId);
    if (tabuserId== userId){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const imageUrl = req.file.path;
    const lastname= req.body.lastname;
    const phone = req.body.phone;
 
    const profession= req.body.profession;
    User.findById(userId)
    .then(user=>{
      if(!user){
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      user.lastname= lastname;
      user.phone = phone;
      user.profession= profession;
      user.pPicture = imageUrl;
      user.save()
      res.status(200).json({ message: 'User updated!', post: user});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}else{

      res.status(422).json('User account does not match');
      
}
  
  }
  
  exports.getUser = async (req, res, next) => {
    const userId= req.params.userId;
    const tabuserId= req.userId;
    if (tabuserId== userId){
      User.findById(userId)
      .then(result=>{
        res.status(200).json({ message: 'User Details Got', user: result});
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    }
    else{

      res.status(422).json('User account does not match');
      
    }
  }


  exports.updatePassword = async (req, res, next) => {
    const userId= req.params.userId;
    const tabuserId= req.userId;
    const pass = req.body.password;
    console.log(userId);
    if (tabuserId== userId){
      const password = pass;
      console.log(password)
      bcrypt
        .hash(password, 12)
        .then(hashedPw => {
          console.log(hashedPw)
          User.findById(userId)
            .then(user=>{
              if(!user){
                const error = new Error('Could not find user.');
                error.statusCode = 404;
                throw error;
              }
              user.password= hashedPw;
              user.save()
              res.status(200).json({ message: 'Password updated!', post: user});
            })      
            .catch(err => {
              if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
            });
        });
    }
    else{
      res.status(422).json('User account does not match');      
    }
  }
  
  
  
  
  