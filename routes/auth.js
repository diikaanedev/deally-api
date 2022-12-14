const express = require('express');

// import all controllers

const authCtrl = require('../controllers/auth');

const authMidleweare = require('../midleweare/auth');

const getToken = require('../midleweare/get-token-orange-api')

const routes = express.Router();

// Add routes
routes.get('/', authMidleweare ,authCtrl.findAuth);
routes.post('/validNumber' , getToken , authCtrl.verifNumberValid);
routes.post('/validCode' , authCtrl.verifCode);
routes.post('/', authCtrl.store);
routes.post('/auth', authCtrl.auth);
routes.post('/auth-dashbord', authCtrl.authDashbord);
routes.put('/', authMidleweare , authCtrl.update);
routes.delete('/', authMidleweare ,authCtrl.delete);

module.exports = routes;
