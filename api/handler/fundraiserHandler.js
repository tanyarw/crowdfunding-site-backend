
const jwt = require('jsonwebtoken')
const Fundraiser = require('../../Models/Fundraiser');
const User = require('../../Models/User');
const { validationResult } = require('express-validator');

//POST a fundraiser
exports.postFundraiser = async (req, res, next) => {
    
    const name= req.body.name;
    const scfname= req.body.scientificName;
    const habitat= req.body.habitat;
    const description = req.body.description;
    const status= req.body.status;
    let creator;
    const fundraiser = new Fundraiser({
        name: name,
        scfname: scfname,
        habitat: habitat,
        description : description,
        status: status,
        userId: req.userId
    });
    return fundraiser
    .save()
    .then(result=>{
      return User.findById(req.userId);
    })
 
  .then(user => {
    creator = user;
    user.fundraisers.push(fundraiser);
    return user.save();
  })
    .then(result => {
        res.status(201).json({ message: 'New Fundraiser Creater', 
        FundraiserId: fundraiser._id , 
        fundraiser: fundraiser,
        creator: { _id: creator._id, name: creator.name }
      });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}

//GET ALL FUNDRAISERS
exports.getAllFundraiser = async (req, res, next) => {
    let fundraiser = Fundraiser.find()
    .then(result => {
      res.status(201).json({ message: 'All Fundraiser Got', fundraiser: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

//Update a fundraiser
exports.updateFundraiser = async (req, res, next) => {
  const fundId= req.params.fundId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name= req.body.name;
  const scfname= req.body.scientificName;
  const habitat= req.body.habitat;
  const description = req.body.description;
  const status= req.body.status;

  Fundraiser.findById(fundId)
  .then(fundraiser=>{
    if(!fundraiser){
      const error = new Error('Could not find fundraiser.');
      error.statusCode = 404;
      throw error;
    }
    fundraiser.name= name;
    fundraiser.scfname= scfname;
    fundraiser.habitat= habitat;
    fundraiser.description = description;
    fundraiser.status= status; 
  });
    fundraiser
    .save()
   
  .then(result => {
    res.status(200).json({
      message: 'Fundraiser updated!', 
      post: result 

    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });


}

//Get one fundraiser
exports.getOneFundraiser = async (req, res, next) => {
  const fundId= req.params.fundId;
  Fundraiser.findById(fundId)
  .then(fundraiser=>{
    if(!fundraiser){
      const error = new Error('Could not find fundraiser.');
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({ message: 'Fundraiser Got', fundraiser: fundraiser});  
})
.catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
};
//Get my fundRaiser
exports.getMyFundraiser = async (req, res, next) => {

  const userId= req.params.userId;
  Fundraiser.findById(fundId)
  .then(fundraiser=>{
    if(!fundraiser){
      const error = new Error('Could not find fundraiser.');
      error.statusCode = 404;
      throw error;
    }
    res.status(201).json({ message: 'Fundraiser Got', fundraiser: fundraiser});  
})
.catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
}

//delete fundraiser
exports.deleteFundraiser = (req, res, next) => {
  const fundId= req.params.fundId;
  Fundraiser.findById(fundId)
    .then(fundraiser => {
      if (!fundraiser) {
        const error = new Error('Could not find fundraiser.');
        error.statusCode = 404;
        throw error;
      }
      if (fundraiser.userId.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      return Fundraiser.findByIdAndRemove(fundId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.fundraisers.pull(fundId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted fundraiser.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};