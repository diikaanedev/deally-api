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



app.use('/v1/api/users'  , authRouter)

app.use('/v1/api/client'  ,commercanteRouter);

app.use('/v1/api/shop'  ,fournisseurRouter);

app.use('/v1/api/products'  ,products);




db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(process.env.MONGO_RUI);
        console.log(`Server started on ${port}`);
    });
});


