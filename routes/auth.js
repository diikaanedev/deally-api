const express = require('express');

// import all controllers

const authCtrl = require('../controllers/auth');

const authMidleweare = require('../midleweare/auth');

const routes = express.Router();

// Add routes
routes.get('/', authMidleweare ,authCtrl.findAuth);
routes.post('/', authCtrl.store);
routes.post('/auth', authCtrl.auth);
routes.post('/auth-dashbord', authCtrl.authDashbord);
routes.put('/', authMidleweare , authCtrl.update);
routes.delete('/', authMidleweare ,authCtrl.delete);

module.exports = routes;
