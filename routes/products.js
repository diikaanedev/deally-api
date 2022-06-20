
const  { Router } =  require('express');

// import all controllers
const productCtrl = require('../controllers/products');

const routes = new Router();

// Add routes
routes.post('/', productCtrl.store);
routes.get('/', productCtrl.all);
routes.get('/:id', productCtrl.one);
routes.put('/:id', productCtrl.update);
routes.delete('/:id', productCtrl.delete);

module.exports = routes;
