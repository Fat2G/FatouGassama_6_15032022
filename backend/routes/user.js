// import d'express pour créer un routeur
const express = require('express');
// création du routeur
const router = express.Router();

// import du controller 
const userCtrl = require('../controllers/user');
// import du middleware de contrôle du mot de passe
const password = require('../middleware/password');
// import du middleware de contrôle de l'adresse mail
const email = require('../middleware/email');
// import du middleware de tentatives de Connexion
const connection = require('../middleware/connection');

//création de routes POST
router.post('/signup', email, password, userCtrl.signup);
router.post('/login', connection, userCtrl.login);

// export du routeur
module.exports = router;