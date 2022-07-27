const addressModel = require('../models/address');

require('dotenv').config({
    path: './.env'
});


exports.store = async (req, res, next) => {



    try {

        let {lastName ,fisrtName , livraisonOrFacture , isMap , phone , zipcode , country , city , addr2 ,  addr1 , name }  = req.body;

        const address = addressModel();

        address.user_created= req.user.id_user ;

        if (isMap!=undefined) {
            address.isMap = true ;
            address.addr1 = addr1;
        }else {
            address.lastName = lastName ;
            address.fisrtName = fisrtName ;
            address.livraisonOrFacture = livraisonOrFacture ;
            address.phone = phone ;
            address.zipcode = zipcode ;
            address.country = country ;
            address.city = city ;
            address.addr2 = addr2 ;
            address.addr1 = addr1 ;
            address.name = name ;

        }



        const addressSave = await address.save();

        res.json({
            message: ' creation réussi',
            status: 'OK',
            data:addressSave,
            statusCode: 201
        });

    } catch (error) {

        res.json({
            message: 'Erreur création',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });

    }
}

exports.update = async (req, res, next) => {
    try {
        
        let {lastName ,fisrtName , livraisonOrFacture , isMap , phone , zipcode , country , city , addr2 ,  addr1 , name ,product }  = req.body;

        const address = addressModel.findById(req.params.id);


        if (fisrtName!=undefined) {
            address.fisrtName = fisrtName;
        }

        if (lastName!=undefined) {
            address.lastName = lastName;
        }

        if (livraisonOrFacture!=undefined) {
            address.livraisonOrFacture = livraisonOrFacture;
        }

        if (isMap!=undefined) {
            address.isMap = isMap;
        }

        if (phone!=undefined) {
            address.phone = phone;
        }

        if (zipcode!=undefined) {
            address.zipcode = zipcode;
        }

        if (country!=undefined) {
            address.country = country;
        }

        if (city!=undefined) {
            address.city = city;
        }

        if (addr2!=undefined) {
            address.addr2 = addr2;
        }

        if (addr1!=undefined) {
            address.addr1 = addr1;
        }

        if (name!=undefined) {
            address.name = name;
        }

        if (product!=undefined) {

            if (address.prodcuts.includes(product)) {
                address.prodcuts.push(product);
            }
        }

        const updateAddress = await address.save();

        res.json({
            message: ' mise à jour réussi',
            status: 'OK',
            data:updateAddress,
            statusCode: 201
        });
        

    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });

    }
}


exports.all = async  (req,res,next)=> {

    const address = await addressModel.find(req.query).exec();

       return res.json({
            message: ' listage réussi',
            status: 'OK',
            data:address,
            statusCode: 201
        });

    try {

        const address = addressModel.find(req.query).excec();

        res.json({
            message: ' listage réussi',
            status: 'OK',
            data:address,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.allUser = async  (req,res,next)=> {
    try {

        const address = addressModel.find({
            user_created : req.user.id_users
        }).excec();

        res.json({
            message: ' listage réussi',
            status: 'OK',
            data:address,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.one = async  (req,res,next)=> {
    try {

        const address = addressModel.findOne(req.params.id).excec();

        res.json({
            message: ' listage réussi',
            status: 'OK',
            data:address,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.delete = async  (req,res,next)=> {
    try {

        const address = addressModel.findOne(req.params.id).excec();

        const deleteAddress = address.delete();

        res.json({
            message: ' supression réussi',
            status: 'OK',
            data:deleteAddress ,
            statusCode: 201
        });
    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
        });
    }
}