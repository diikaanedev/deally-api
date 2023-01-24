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

    reference : {
        type : String,
        default :''
    },

    referencePay : {
        type : String,
        default :''
    },


    statusShop : {
        type: String,
        enum: ['CREATE', 'DELIVERY','FAILED' , 'PAY' ,'REPAY','FINISHED'],
        default: 'CREATE'
    },


    typePaiment : {
        type: String,
        enum: ['espece', 'om','mtn' , 'micro','bank' ],
        default: 'espece'
    },


    statusClient : {
        type: String,
        enum: ['PANNIER','CREATE', 'DELIVERY','FAILED' , 'PAY'],
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