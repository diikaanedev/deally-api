const itemOrerModel = require('../models/order-item');

const productModel = require('../models/product');

const populateObject = [{
    path: 'product',
    populate :  {
        path :'media'
    }
},{
    path : 'livraison',
    populate :  {
        path :'point'
    }
}];

exports.store = async (req, res ,next ) => {
    
    try {
        
        let {product   , quantite , price , typePaiment } = req.body ;

        console.log(req.body);

        const p  = await productModel.findById(product).exec();



        if (p) {

            const item = itemOrerModel();


            item.product = product ;

            item.quantite = quantite ;

            item.typePaiment = typePaiment ;

            item.priceTotal = price ;

            item.client = req.user.id_user ;

            item.shop = p.shop ;

            //TODO mettre shop sur orderId


        
            const saveItem = await  item.save();

            const saveItemFind = await itemOrerModel.findById(saveItem._id).populate(populateObject).exec();

        

            return res.status(201).json({
                message: 'item crée avec succes',
                status: 'OK',
                data: saveItemFind,
                statusCode: 201
            });

        }else {
            return res.status(400).json({
                message: 'Erreur creation',
                status: 'OK',
                data: "error",
                statusCode: 400
            })
        }

        

    } catch (error) {
        res.status(400).json({
            message: 'Erreur creation',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
    
}

exports.all = async (req  , res ,next ) => {
    
    try {
        const items = await itemOrerModel.find(req.query).populate(populateObject).exec(); 
        res.status(200).json({
            message: 'items trouvée avec succes',
            status: 'OK',
            data: items,
            statusCode: 200
        })
    } catch (error) {
        res.status(400).json({
            message: 'items non trouvée',
            status: 'OK',
            data: err,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const item = await itemOrerModel.findById(req.params.id).populate(populateObject).exec(); 
        res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        })
    } catch (error) {
        res.status(400).json({
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
            client : req.user.id_user,
            statusClient :  'PANNIER'
        }).populate(populateObject).exec(); 
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.status(400).json({
            message: 'clients non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.orderClient = async (req  , res ,next ) => {
   
    try {
        const item = await itemOrerModel.find({
            statusClient :  'CREATE',
            client : req.user.id_user
        }).populate(populateObject).exec(); 
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.status(400).json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.orderShop = async (req  , res ,next ) => {
   
    try {
        const item = await itemOrerModel.find({
            shop : req.user.id_user
        }).populate(populateObject).exec(); 
        return res.status(200).json({
            message: 'item trouvée avec succes',
            status: 'OK',
            data: item,
            statusCode: 200
        }) 
    } catch (error) {
        res.json({
            message: 'item non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { quantite , statusShop , statusClient } = req.body ;

    console.log(statusShop);
    

    const item = await  itemOrerModel.findById(req.params.id).populate(populateObject).exec();

    if (quantite!=undefined) {
        item.quantite = quantite;
    } 

    if (statusShop != undefined) {
        item.statusShop = statusShop;
    } 

    if (statusClient!=undefined) {
        item.statusClient = statusClient;
    }   

    item.save().then(result => {
        res.status(200).json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: result,
            statusCode: 200
        });
    }).catch(err => {
        res.status(400).json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: err,
            status: 'NOT OK'
        });
    });



}

exports.delete = (req  , res ,next ) => itemOrerModel.findByIdAndDelete(req.params.id).then(result => {
    res.status(200).json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch( err => res.status(400).json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: err,
    status: 'NOT OK'
}));