const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema= new Schema({
    fundId:{
        type: Schema.Types.ObjectId,
        ref:'fundId',
        require:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    billNo:{
        type: String,
        require: true,
    },

    amount: {
        type: String,
        require: true
        },
    tax: {
        type: String,
        require: true
        },
    total:{
        type: String,
        require: true
    }
})

module.exports= mongoose.model('Billing', billingSchema);