const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemOrdersModel = new Schema({
    
    

    product : {
        type: Schema.Types.ObjectId,
        ref :'product'
    },

    order : {
        type: Schema.Types.ObjectId,
        ref :'order'
    },

    shop : {
        type: Schema.Types.ObjectId,
        ref :'shop'
    },

    client : {
        type: Schema.Types.ObjectId,
        ref :'client'
    },

    livraison : {
        type: Schema.Types.ObjectId,
        ref :'place'
    },

    statusShop : {
        type: String,
        enum: ['CREATE', 'DELIVERY','CANCELED' , 'REPAY'],
        default: 'CREATE'
    },

    statusClient : {
        type: String,
        enum: ['PANNIER','CREATE', 'DELIVERY','CANCELED' , 'PAY'],
        default: 'PANNIER'
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