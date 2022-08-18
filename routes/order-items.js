const express = require('express');

// import all controllers

const itemOrderCtrl = require('../controllers/item-order');


const routes = express.Router();

// Add routes
routes.get('/' ,itemOrderCtrl.panierClient);
routes.get('/orderClient' ,itemOrderCtrl.orderClient);
routes.get('/:id' ,itemOrderCtrl.one);
routes.post('/' , itemOrderCtrl.store);
routes.put('/' , itemOrderCtrl.update);
routes.delete('/:id' ,itemOrderCtrl.delete);

module.exports = routes;
