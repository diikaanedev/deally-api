const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderModel = new Schema({

    items: [ {
        type: Schema.Types.ObjectId,
        ref: "item-order"
    }],

    price : {
        type : Number
    },

    status: {
        type: String,
        enum : ['PENDING','FAILED' ,'COMPLETED'],
        default: 'PENDING'
    },

    livraison : {
        type: Schema.Types.ObjectId,
        ref :'place'
    },
    typePaiment : {
        type: String,
        enum: ['BANK_TRANSFERT', 'POS_DELIVERY','CASH_DELIVERY' , 'MICROFINACING' ],
        default: 'BANK_TRANSFERT'
    },

    reference : {
        type : String,
        default :''
    },


    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('order', orderModel);