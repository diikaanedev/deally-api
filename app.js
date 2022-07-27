const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const db = require('./config/db');

const app = express();

const path = require('path');

require('dotenv').config({
    path: './.env'
});

app.use(cors());

app.use(bodyParser.json({
    limit: '10000mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10000mb'
}));

/**
 * Import Router 
 */


const authRouter = require('./routes/auth');

const commercanteRouter = require('./routes/commercant') ;

const fournisseurRouter = require('./routes/fournisseur') ;

const products = require('./routes/products');

const orderItemRouter = require('./routes/order-items');

const fileRouter = require('./routes/file');

const orderRouter = require('./routes/orders');

const transactionRouter = require('./routes/transaction');

const placeRouter = require('./routes/address');

const authMidleweare = require('./midleweare/auth');




app.use('/v1/api/users'  , authRouter)

app.use('/v1/api/client'  ,commercanteRouter);

app.use('/v1/api/shop'  ,fournisseurRouter);

app.use('/v1/api/products'  ,products);

app.use('/v1/api/files'  ,fileRouter);

app.use('/v1/api/order-items'  , authMidleweare,orderItemRouter);

app.use('/v1/api/transactions'  , authMidleweare,transactionRouter);

app.use('/v1/api/orders'  , authMidleweare,orderRouter);
app.use('/v1/api/address'  , authMidleweare,placeRouter);




db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(process.env.MONGO_RUI);
        console.log(`Server started on ${port}`);
    });
});


