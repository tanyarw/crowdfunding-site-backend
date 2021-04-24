const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config()
var RateLimit = require('express-rate-limit');
//OPEN IMPORT OF THE ROUTES
const authRoutes = require('./api/routes/authRoutes'); 
const fundraiserRoutes = require('./api/routes/fundraiserRoutes'); 
const userRoutes = require('./api/routes/userRoutes'); 
const billingRoutes = require('./api/routes/billingRoutes');
const hackedRoutes = require('./api/routes/hackedRoutes');
//Twilio 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const Hacked = require('./Models/Hacked');
//CLOSE IMPORT OF THE ROUTES

mongoose.Promise= global.Promise;

mongoose
     .connect( process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
     

app.use(cors())
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  }
});
app.use(multer({ storage: fileStorage }).single('image'));      
app.use(morgan('dev'));
app.use(express.static('upload'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','Origin,X-Requested-with,Content-Type,Accept,Authorization');
    
    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

const rateLimit = require("express-rate-limit");
const testFunction =(req,res,next)=>{
  //console.log(req);
  console.log('LIMITING');
  var newAdd = req.connection.remoteAddress;
  console.log('CLIENT ADDR: ', newAdd);
  /*client.messages
  .create({
     body: 'DDos Attack in progress!',
     from: '+14787968603',
     to: '+918861312434'
   })
  .then(message => console.log(message));*/
  const ip= newAdd;
  const website = 1;
  const newHack = new Hacked({
    ip:ip,
    website:website,
    attackType:'DDOS'
  });
  newHack.save().then(result=>{
   // res.status(201).json({message:'We have notified the admin!'})
   console.log('We have notified the admin!')
  })
}
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2,
  onLimitReached: testFunction
});


app.use("/auth", apiLimiter);

// only apply to requests that begin with /api/ 
app.use('/hacked', hackedRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));

app.use('/auth',authRoutes);
app.use('/fundraiser',fundraiserRoutes);
app.use('/user',userRoutes);
app.use('/bill',billingRoutes);
app.use((error, req,res,next)=>{
    console.log(error);
    const status= error.statusCode || 500;
    const message = error.message;
    const data= error.data;
    res.status(status).json({message: message, data: data})
})

module.exports = app;