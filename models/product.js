const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postModel = new Schema({
    
    images: [{
        type: Schema.Types.ObjectId,
        ref :'media'
    }],

    name : {
        type: String,
        required : true,
        unique : true
    },

    pack_price  : [{
        type: Schema.Types.ObjectId,
        ref :'pack_price' 
    }],

    category : {
        type: Schema.Types.ObjectId,
        ref :'categorie'
    },

    shop : {
        type: Schema.Types.ObjectId,
        ref :'shop'
    },

    description : {
        type : String
    },

    address : [{
        type: Schema.Types.ObjectId,
        ref :'place'
    }],

    condition_concervation : {
        type : String
    },
    
    stock : {
        type: String
    },

    quantite_per_article : {
        type : String ,
        default :"1"
    },


    ranking : {
        type : Number,
        default : 5
    },

    publish_date: {
        type: Date,
    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('product', postModel) ;