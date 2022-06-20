const productModel = require('../models/product');

const addressModel = require('../models/address');

const categorieModel = require('../models/categorie');

const packPriceModel = require('../models/pack_price');

const shopModel = require('../models/fournisseur');

const product = require('../models/product');

const uploadFileAws  = require('../utils/s3');


const populateObject = [{
    path: 'category',
    select: 'title'
}, {
    path: 'shop',
    select: 'nameShop'
}, {
    path: 'address',
},];


exports.store = async (req, res, next) => {

    try {

        const post = postModel();

        let {
            images,

            name,

            pack_price,

            category,

            description,

            address,

            condition_concervation,

            stock,

            quantite_per_article,

            publish_date } = req.body;


        const product = productModel();

        product.name = name;

        product.category = category;

        product.description = description;

        product.address = address;

        product.condition_concervation = condition_concervation;

        product.stock = stock;

        product.quantite_per_article = quantite_per_article;

        product.publish_date = publish_date;

        product.shop = req.user.id;

        const tabImages = [];

        for (const iterator of images) {

            const result = await uploadFileAws.uploadFile(iterator);

            const file = filesModel();

            file.url = result.fileName;

            file.user = req.user.id;

            const saveFile = await file.save();

            tabImages.push(saveFile._id);
        }

        const tabPricePack = [];

        for (const iterator of pack_price) {

            const packPrice = packPriceModel();

            packPrice.min = iterator.min;

            packPrice.max = iterator.max;

            packPrice.price = iterator.price;

            const savePricePack = await packPrice.save();

            tabPricePack.push(savePricePack._id);
        }

        product.pack_price = tabPricePack;

        product.images = tabImages;

        const saveProduct = await product.save();



        const fournisseur = await shopModel.findById(req.user.id);

        fournisseur.products.push(saveProduct._id);

        const saveFournisseur = await fournisseur.save();


        res.status(201).json({
            message: ' àjout réussi',
            status: 'OK',
            data: saveProduct,
            statusCode: 201
        });



    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}


exports.all = async (req, res, next) => {

    try {

        const products = productModel.find(req.query).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }

}

exports.one = async (req, res, next) => {
    try {

        const products = productModel.findById(req.params.id).populate(populateObject).exec();

        return res.status(200).json({
            message: 'listage réussi',
            status: 'OK',
            data: products,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.update = async (req, res, next) => {
    try {

        const product = await productModel.findById(req.params.id).populate(populateObject).exec();

        let {

            images,

            name,

            pack_price,

            category,

            description,

            address,

            condition_concervation,

            stock,

            quantite_per_article,

            publish_date
        } = req.body;

        if (images != undefined) {
            const tabImages = [];

            const result = await uploadFile(iterator);

            const file = filesModel();

            file.url = result.fileName;

            file.user = req.user.id;

            const saveFile = await file.save();

            tabImages.push(saveFile._id);

            product.images = images;
        }

        if (name != undefined) {
            product.name = name;
        }

        if (pack_price != undefined) {

            const tabPricePack = [];

            for (const iterator of pack_price) {

                const packPrice = packPriceModel();

                packPrice.min = iterator.min;

                packPrice.max = iterator.max;

                packPrice.price = iterator.price;

                const savePricePack = await packPrice.save();

                tabPricePack.push(savePricePack._id);
            }

            product.pack_price = tabPricePack;

        }

        if (category != undefined) {
            product.category = category;
        }

        if (description != undefined) {
            product.description = description;
        }

        if (address != undefined) {
            product.address = address;
        }

        if (condition_concervation != undefined) {
            product.condition_concervation = condition_concervation;
        }

        if (stock != undefined) {
            product.stock = stock;
        }

        if (quantite_per_article != undefined) {
            product.quantite_per_article = quantite_per_article;
        }

        if (publish_date != undefined) {
            product.publish_date = publish_date;
        }

        const saveProduct = await product.save();

        return res.status(200).json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: saveProduct,
            statusCode: 200
        });


    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}

exports.delete = async (req, res ,next ) => {
    try {
        
        let { id }  = req.params;
        
        const product = await productModel.findById(id).exec();

        const deleteProduct = await product.delete();

        return res.status(200).json({
            message: 'supreesion réussi',
            status: 'OK',
            data: deleteProduct,
            statusCode: 200
        });

    } catch (error) {
        res.status(404).json({
            statusCode: 404,
            message: "erreur ",
            data: error,
            status: 'NOT OK'
        });
    }
}