const express = require('express');

// import all controllers

const contryCtrl = require('../controllers/contry');

const authMidleweare = require('../midleweare/auth');

const routes = express.Router();

// Add routes
routes.get('/', authMidleweare ,contryCtrl.all);
routes.post('/', authMidleweare , contryCtrl.store);
routes.put('/:id', authMidleweare , contryCtrl.update);
routes.delete('/:id', authMidleweare ,contryCtrl.delete);

module.exports = routes;
