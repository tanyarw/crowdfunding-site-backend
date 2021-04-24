const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hackedSchema = new Schema({
    website:{
        type:String,
        required: true
    },
    ip:{
        type:String,
        required: false
    },
    attackType:{
        type:String,
        required: false
    },
    time : { 
        type: Number, 
        default: (new Date()).getTime() 
    } 
})

module.exports= mongoose.model('Hacked', hackedSchema);