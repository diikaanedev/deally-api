const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressModel = new Schema({

    name: {
        type: String,
    },

    addr1 : {
        type: String
    },

    addr2 : {
        type: String
    },

    city : {
        type: String
    },

    country : {
        type : String
    },

    zipcode : {
        type: String
    },

    phone : {
        type: String,
    },


    isMap : {
        type: Boolean,
        default : false
    },

    user_created : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    livraisonOrFactureOrEntrepot : {
        type: String,
        enum: ['livraison', 'facturation','entrepot'],
        default: 'livraison'
    },

    products : [{
        type: Schema.Types.ObjectId,
        ref :'product'
    }],

    firstName : {
        type: String
    },

    lastName : {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('place', addressModel);