const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };  
//OPEN IMPORT OF THE ROUTES
const authRoutes = require('./api/routes/authRoutes'); 
const fundraiserRoutes = require('./api/routes/fundraiserRoutes'); 
const userRoutes = require('./api/routes/userRoutes'); 
const billingRoutes = require('./api/routes/billingRoutes');
//CLOSE IMPORT OF THE ROUTES
mongoose.Promise= global.Promise;

mongoose
     .connect( "mongodb+srv://tanya:tanya@iwp.c0ufz.mongodb.net/wildsprint?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
app.use(morgan('dev'));
app.use(express.static('upload'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','Origin,X-Requested-with,Content-Type,Accept,Authorization');
    
    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.set("view engine", "ejs");        
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

app.get("/login", function (req, res) { 
    res.render("login"); 
});

app.get("/signup", function (req, res) { 
    res.render("signup"); 
});

app.get("/form", function (req, res) { 
    res.render("form"); 
});

app.get("/profile", function (req, res) { 
    res.render("profile"); 
});

app.get("/fund", function (req, res) { 
    res.render("fund"); 
});

app.get("/event", function (req, res) { 
    res.render("event"); 
});

app.get("/donate", function (req, res) { 
    res.render("donate"); 
});

app.get("/myBills", function (req, res) { 
    res.render("myBills"); 
});

app.get("/myFundBills", function (req, res) { 
    res.render("myFunBills"); 
});

app.get("/update", function (req, res) { 
    res.render("update"); 
});

app.get("/gallery", function (req, res) { 
    res.render("gallery"); 
});


module.exports = app;