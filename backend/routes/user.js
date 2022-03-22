//import d'express pour créer un routeur
const express = require('express');
const router = express.Router();

//association des fonctions aux différentes routes
const userCtrl = require('../controllers/user');

//création de routes POST
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//export du routeur
module.exports = router;