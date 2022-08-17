const express = require('express');

// import all controllers

const orderCtrl = require('../controllers/orders');


const routes = express.Router();

// Add routes
routes.get('/' ,orderCtrl.all);
routes.get('/byShop' ,orderCtrl.allByShop);
routes.post('/' , orderCtrl.store);
routes.put('/' , orderCtrl.update);
routes.delete('/' ,orderCtrl.delete);

module.exports = routes;
