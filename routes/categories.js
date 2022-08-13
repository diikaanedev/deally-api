const express = require('express');

// import all controllers

const categorieCtrl = require('../controllers/categorie');


const routes = express.Router();

// Add routes
routes.get('/' ,categorieCtrl.all);
// routes.get('/parent' ,categorieCtrl.all);
// routes.post('/' , categorieCtrl.store);
// routes.put('/' , categorieCtrl.update);
// routes.delete('/' ,categorieCtrl.delete);

module.exports = routes;
