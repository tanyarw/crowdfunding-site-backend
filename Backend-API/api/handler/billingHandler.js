
const jwt = require('jsonwebtoken')
const Fundraiser = require('../../Models/Fundraiser');
const User = require('../../Models/User');
const Billing = require('../../Models/Billing');
const { validationResult } = require('express-validator');

//make payment for a fundraiser
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

//Get all bills for a user
exports.getAllbillsbyUID = async (req, res, next) => {
    const userId = req.userId;
    let billing = Billing.find({userId:userId})
    .then(result => {
      res.status(201).json({ message: 'All Bills Got', billing: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

//get all bills for a fundraiser with total collection 
exports.getAllbillsbyFID = async (req, res, next) => {
    const fundId = req.params.fundId;
    Fundraiser.findById(fundId)
    .then(fundraiser =>{
        const user = fundraiser.userId;
        if (user===req.userId||req.userId ==="5f7d79669a69a44509b2a735"){
        let billing = Billing.find({fundId:fundId})
        .then(result => {
        
        const len = result.length;
        var fund_total=0;
        for (i=0 ; i<len;i++){
            let amount = result[i].amount;
            fund_total = fund_total+ parseInt(amount);
        }
        res.status(201).json({ message: 'All Bills Got', billing: result, total_collection: String(fund_total)});
        })
        .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        });
    }else{
        const error = new Error('You are not an organiser of this fund!!');
        error.statusCode = 422;
        throw error;
    }
})
.catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });  
}

