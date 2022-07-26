const ordersModel = require('../models/orders');

exports.store = async (req, res ,next ) => {
    try {
        let { items , price  } = req.body ;




        
        const order = ordersModel();

        order.items = items;
        
        order.price = price;

        const saveOrder = await  order.save();

        return res.json({
            message: 'order crée avec succes',
            status: 'OK',
            data: saveOrder,
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
        const orders = await ordersModel.find(req.query).exec(); 
        res.json({
            message: 'orders trouvée avec succes',
            status: 'OK',
            data: orders,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'orders non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const order = await ordersModel.findById(req.params.id).exec(); 
        res.json({
            message: 'order trouvée avec succes',
            status: 'OK',
            data: order,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'order non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { items ,price , status  } = req.body ;

    const order = ordersModel.findById(req.params.id).exec();

    if (items!=undefined) {
        order.items = items;
    }   

    if (price!=undefined) {
        order.price = price;
    }   

    if (status!=undefined) {
        order.status = status;
    }   
  
    order.save().then(result => {
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

exports.delete = (req  , res ,next ) => ordersModel.findByIdAndDelete(req.params.id).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch( error => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));