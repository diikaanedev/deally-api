const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    
    phone: {
        type: String,
        required : true,
        unique : true
    },

    email: {
        type: String,
    },
    
    password: {
        type: String,
    },

    passwords : {
        type : Array
    },
    
    role: {
        type : String,
        enum: ['admin', 'super', 'fournisseur', 'commercant', 'transporteur'],
        default: 'commercant'
    },

    sexe: {
        type : String,
        enum: ['homme', 'femme'],
        default: 'homme'
    },

    description : {
        type: String,
        default :""
    },

    avatar : {
        type: Schema.Types.ObjectId,
        ref: "file"
    },
    
    cover : {
        type: Schema.Types.ObjectId,
        ref: "file"
    },

    nameShop : {
        type: String,
        default : ""
    },

    firstName  : {
        type : String,
        default :""
    },

    lastName  : {
        type : String,
        default :""
    },

    contry : {
        type : String,
        default :"Nigeria"
    },

    city : {
        type : String,
        default :"lagos"
    },

    address : [{
        type: Schema.Types.ObjectId,
        ref: "place"
    }],

     
    products : [{
        type: Schema.Types.ObjectId,
        ref: "products",
        default : []
    }],
    
    orders : [{
        type: Schema.Types.ObjectId,
        ref: "order"
    }],

    transactions : [{
        type: Schema.Types.ObjectId,
        ref: "transaction"
    }],

    hasAcceptedNewsletter : {
        type : Boolean,
        default : false
    },

    solde: {
        type  : String ,
        default :'0'
    },

    callFund : [{
        type: Schema.Types.ObjectId,
        ref: "callFund",
        default : []
    }],


    token : {
        type : String,
        default : ""
    },
    
    date: {
        type: Date,
        default: Date.now()
    }
},{
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.passwords;
        delete  ret.token;
        delete ret.__v;
      },
    },
  });

module.exports = mongoose.model('users', UserModel) ;