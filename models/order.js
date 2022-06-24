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

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('order', orderModel);