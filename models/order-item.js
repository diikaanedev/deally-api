const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemOrdersModel = new Schema({
    
    

    product : [{
        type: Schema.Types.ObjectId,
        ref :'product'
    }],

    shop : {
        type: Schema.Types.ObjectId,
        ref :'shop'
    },

    client : {
        type: Schema.Types.ObjectId,
        ref :'client'
    },

    conditionShop : {
        type: String,
        enum: ['CREATE', 'DELIVERY','CANCELED' , 'REPAY'],
        default: 'CREATE'
    },

    conditionClient : {
        type: String,
        enum: ['CREATE', 'DELIVERY','CANCELED' , 'PAY'],
        default: 'CREATE'
    },

    quantite : {
        type : Number
    },

    priceTotal : {
        type : String
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('item-order', itemOrdersModel) ;