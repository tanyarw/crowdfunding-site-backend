const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//OPEN IMPORT OF THE ROUTES
const authRoutes = require('./api/routes/authRoutes'); 
const fundraiserRoutes = require('./api/routes/fundraiserRoutes'); 
const userRoutes = require('./api/routes/userRoutes'); 
const billingRoutes = require('./api/routes/billingRoutes');
//CLOSE IMPORT OF THE ROUTES
mongoose.Promise= global.Promise;

mongoose
     .connect( "mongodb+srv://ng:ng@wildsprint.ksltt.mongodb.net/WildSprint?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
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