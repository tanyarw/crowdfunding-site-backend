const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    name : {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    profession: {
        type:String,
        required: false,
    },
    fundraisers:[{
        type: Schema.Types.ObjectId,
        ref:'fundraiser'
    }
    ]
});

module.exports= mongoose.model('User', userSchema);