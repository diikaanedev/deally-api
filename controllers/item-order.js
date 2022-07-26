const itemOrerModel = require('../models/order-item');

exports.store = async (req, res ,next ) => {
    
    try {
        
        let {product   , quantite} = req.body ;



        const item = itemOrerModel();

        item.product = product ;

        item.quantite = quantite ;

        item.client = req.user.id_user ;


        const saveItem = await  item.save();

    return res.json({
        message: 'item crée avec succes',
        status: 'OK',
        data: saveItem,
        statusCode: 201
    })
    } catch (error) {
        res.json({
            message: 'Erreur creation',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
    
}

exports.all = async (req  , res ,next ) => {
    
    try {
        const items = await itemOrerModel.find(req.query).exec(); 
        res.json({
            message: 'items trouvée avec succes',
            status: 'OK',
            data: items,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'items non trouvée',
            status: 'OK',
            data: err,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const item = await itemOrerModel.findById(req.params.id).exec(); 
        res.json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'clients non trouvée',
            status: 'OK',
            data: err,
            statusCode: 400
        })
    }
}

exports.panierClient = async (req  , res ,next ) => {
    try {
        const item = await itemOrerModel.find({
            client : req.user.id_user
        }).exec(); 
        res.json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'clients non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { quantite } = req.body ;

    const item = itemOrerModel.findById(req.params.id).exec();

    if (quantite!=undefined) {
        item.quantite = quantite;
    }   

    item.save().then(result => {
        res.json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: result,
            statusCode: 200
        });
    }).catch(err => {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: err,
            status: 'NOT OK'
        });
    });



}

exports.delete = (req  , res ,next ) => itemOrerModel.findByIdAndDelete(req.params.id).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch( err => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));