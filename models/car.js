const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carModel = new Schema({


    cover : {
        type: Schema.Types.ObjectId,
        ref :'file'
    },

    assuranceFile : {
        type: Schema.Types.ObjectId,
        ref :'file'
    },

    licenceFile : {
        type: Schema.Types.ObjectId,
        ref :'file'
    },

    categorie : {
        type: String,
        enum: ['van', 'camion','taxi','moto','particulier'],
        default: 'livraison'
    },

    longeur  : {
        type : String,
        default : ''
    },

    largeur  : {
        type : String,
        default : ''
    },

    hauteur  : {
        type : String,
        default : ''
    },

    marque  : {
        type : String,
        default : ''
    },

    model  : {
        type : String,
        default : ''
    },

    carteGriseNumber  : {
        type : String,
        default : ''
    },

    assuranceNumber  : {
        type : String,
        default : ''
    },

    assurannceDate  : {
        type : String,
        default : ''
    },


    user : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },

    enLigne  : {
        type : String ,
        default  :'1',
    },
    

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('car', carModel);