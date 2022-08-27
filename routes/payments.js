const express = require('express');

// import all controllers

const transactionsCtrl = require('../controllers/payments');


const routes = express.Router();

routes.post('/' , transactionsCtrl.addPayment);
routes.post('/payment_wh' , transactionsCtrl.paymentWH);
module.exports = routes;
