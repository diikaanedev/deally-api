const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressModel = new Schema({

    name: {
        type: String,
        required : true
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
        required : true,
        unique  :true
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

    fisrtName : {
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

module.exports = mongoose.model('address', addressModel);