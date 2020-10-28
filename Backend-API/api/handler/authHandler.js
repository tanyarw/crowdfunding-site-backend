const User = require('../../Models/User');
const {validationResult} = require('express-validator');
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 401;
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const role = req.body.role;
    bcrypt
      .hash(password, 12)
      .then(hashedPw => {
        const user = new User({
          email: email,
          password: hashedPw,
          name: name,
          role:role
        });
        return user.save();
      })
      .then(result => {
        res.status(201).json({ message: 'User created!', userId: result._id });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


  exports.login = (req,res,next)=>{
      const email = req.body.email;
      const password= req.body.password;
      let loadedUser;
      User.findOne({ email: email })
      .then(user=>{
            if (!user) {
              const error = new Error('A user with this email could not be found.');
              error.statusCode = 401;
              throw error;
            }
            loadedUser = user;
            //console.log('comparing')
            return bcrypt.compare(password, user.password);
          })
      .then(isEqual => {
        if(!isEqual){
            const error= new Error('Wrong Password');
            error.statusCode= 401;
            throw error;
        }
        const token= jwt.sign({
           email: loadedUser.email,
           userId: loadedUser._id.toString() 
        },'teenagemutantninjaturtle',{expiresIn:'1h'});
        res.status(200).json({token:token, role:loadedUser.role,name:loadedUser.name, userId: loadedUser._id.toString()})
      })
      .catch(err=>{
          if(!err.statusCode){
              err.statusCode=500;
          }
          next(err);
      })
  }

  exports.forgot = (req, res, next) => {
    const email= req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)
    User.findOne({ email: email })
      .then(user=>{
        if (!user) {
           
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
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
      });   
  }