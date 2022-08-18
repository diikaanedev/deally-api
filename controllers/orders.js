const ordersModel = require('../models/order');
const ordersItemsModel = require('../models/order-item');

exports.store = async (req, res, next) => {
    try {
        let { items, price } = req.body;


        order.items = items;

        order.price = price;

        const saveOrder = await order.save();

        const order = ordersModel();

        for (const iterator of items) {
            
            const orderItems = await  ordersItemsModel.findById(items).exec();
 
            orderItems.order = saveOrder._id;
           
            const  n =  await orderItems.save();

        }

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

exports.all = async (req, res, next) => {

    try {
        const orders = await ordersModel.find(req.query).populate({
            path: 'items',
            populate: {
                path: 'product',
                select: 'shop',
                
            }
        }).exec();


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

exports.allByClient = async (req, res, next) => {

    try {
        const orders = await ordersModel.find({
            client : req.user.id_user
        }).populate({
            path: 'items',
            populate: {
                path: 'product',
                select: 'shop',
                
            }
        }).exec();


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


exports.allByShop = async (req, res, next) => {

    try {
        const orders = await ordersModel.find(req.query).populate({
            path: 'items',
            populate: {
                path: 'product',
                select: 'shop',
                match: {
                    shop: req.user.id_user
                }
            }
        }).exec();

        const v = orders.filter(e => {

            if (e.items.length > 0) {
                const b = e.items.filter(el => {
                    if (el.product != null) {
                        return el;
                    }
                });
                e.items = b;
                return e;
            }
        });

        res.json({
            message: 'orders trouvée avec succes',
            status: 'OK',
            data: v.filter(e => {
                if (e.items.length > 0) {
                    return e;
                }
            }),
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

exports.one = async (req, res, next) => {
    try {
        const order = await ordersModel.findById(req.params.id).populate('items').exec();
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

exports.update = async (req, res, next) => {
    let { items, price, status } = req.body;

    const order = ordersModel.findById(req.params.id).exec();

    if (items != undefined) {
        order.items = items;
    }

    if (price != undefined) {
        order.price = price;
    }

    if (status != undefined) {
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

exports.delete = (req, res, next) => ordersModel.findByIdAndDelete(req.params.id).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: result,
        statusCode: 200
    });
}).catch(error => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));