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
    ],
    role:{
        type:String,
        enum:['admin','organiser','user'],
        required: true,
    }
});

module.exports= mongoose.model('User', userSchema);