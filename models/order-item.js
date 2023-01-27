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
        enum: ['CREATE', 'DELIVERY','FAILED' , 'PAY' ,'REPAY','FINISHED',"MICRO","ACCEPT"],
        default: 'CREATE'
    },


    typePaiment : {
        type: String,
        enum: ['espece', 'om','mtn' , "wallet",'micro','bank' ],
        default: 'espece'
    },


    statusClient : {
        type: String,
        enum: ['PANNIER','CREATE','FAILED' , 'PAY',"REPAY"],
        default: 'PANNIER'
    },

    quantite : {
        type : Number
    },

    priceTotal : {
        type : Number
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('item-order', itemOrdersModel) ;