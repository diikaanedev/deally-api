const express = require('express');

// import all controllers

const itemOrderCtrl = require('../controllers/item-order');


const routes = express.Router();

// Add routes
routes.get('/' ,itemOrderCtrl.panierClient);
routes.post('/' , itemOrderCtrl.store);
routes.put('/' , itemOrderCtrl.update);
routes.delete('/' ,itemOrderCtrl.delete);

module.exports = routes;
