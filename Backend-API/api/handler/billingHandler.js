
const jwt = require('jsonwebtoken')
const Fundraiser = require('../../Models/Fundraiser');
const User = require('../../Models/User');
const Billing = require('../../Models/Billing');
const { validationResult } = require('express-validator');

exports.makePayment= async (req, res, next) => {
    const fundId= req.params.fundId;
    const amount = req.body.amount;
    const userId=  req.userId;
    const tax = parseInt(amount)*0.18;
    const total = tax+ parseInt(amount);
    let creator;
    let fund;
     const billing = new Billing ({
         userId: userId,
         fundId :fundId,
         amount: amount,
         tax: tax,
         total: total,
     })
     return billing.save()
     .then(result=>{
        return User.findById(req.userId);
      })
      .then(user => {
        if(!user){
          const error = new Error('Could not find user.');
          error.statusCode = 404;
          throw error;
        }
        creator = user;
        user.bills.push(billing);
        user.save();
      })
      .then(result =>{
          return Fundraiser.findById(fundId)
      })
      .then(fundraiser => {
        if(!fundraiser){
          const error = new Error('Could not find fundraiser.');
          error.statusCode = 404;
          throw error;
        }
        fund = fundraiser;
        fundraiser.bills.push(billing);
        fundraiser.save();
      })
   .then(result => {
    res.status(201).json({ message: 'Bill generater!', BillId: billing._id , Bill: billing, creator: { _id: creator._id, name: creator.name }, fundraiser :{ _id: fund._id, name: fund.name } });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

