const Hacked = require('../../Models/Hacked');

//get all ddos
exports.getHacked = (req,res,next)=>{
    let getHacked = Hacked.find()
    .then(result=>{
        res.status(201).json({ message: 'All DDOS attack data Got', Hacked: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}