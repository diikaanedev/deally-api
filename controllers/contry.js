const contryModel = require('../models/contry');

exports.store = async (req, res ,next ) => {
    try {
        let { name } = req.body ;

        let user = req.user.id;
        
        const contry = contryModel({user, name });

        const saveContry = await  contry.save();

        return res.json({
            message: 'report crée avec succes',
            status: 'OK',
            data: saveContry,
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
        const contry = await contryModel.find(req.query).exec(); 
        res.json({
            message: 'contry trouvée avec succes',
            status: 'OK',
            data: contry,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'contry non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }

}

exports.one = async (req  , res ,next ) => {
    try {
        const contry = await contryModel.findById(req.params.id).populate('user').exec(); 
        res.json({
            message: 'contry trouvée avec succes',
            status: 'OK',
            data: contry,
            statusCode: 200
        })
    } catch (error) {
        res.json({
            message: 'contry non trouvée',
            status: 'OK',
            data: error,
            statusCode: 400
        })
    }
}

exports.update = async  (req  , res ,next ) => {
    let   { name } = req.body ;

    const contry = contryModel.findById(req.params.id).exec();

    if (name!=undefined) {
        contry.name = name;
    }   
  

    
   

    contry.save().then(result => {
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

exports.delete = (req  , res ,next ) => contryModel.findByIdAndDelete(req.params.id).then(result => {
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