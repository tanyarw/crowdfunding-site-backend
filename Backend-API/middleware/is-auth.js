const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = String(req.cookies.token);
  let decodedToken;
  
  req.userId = decodedToken.userId;
  next();
};