//import du package bcrypt
const bcrypt = require('bcrypt');
//import du package jsonwebtoken
const jwt = require('jsonwebtoken');
//import du package crypto-js pour chiffrer le mail
const cryptoJs = require('crypto-js');

//import du modèle users
const User= require('../models/user');

// utilisation des variables d'environnement pour cacher les données sensibles
require('dotenv').config();
const cryptoKey = process.env.CRYPTOJS_KEY_EMAIL;
const jwtKey = process.env.JWT_KEY;

//fonction pour l'enregistrement des utilisateurs
exports.signup = (req, res, next) => {
  // chiffrage de l'email 
  const emailCryptoJs = cryptoJs.SHA256(req.body.email, `${cryptoKey}` ).toString();
  console.log("emailCryptoJs");
  console.log(emailCryptoJs);

  // hash du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: emailCryptoJs,
        password: hash
      });
      // Et si le mail est déjà utilisé ?
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};

//fonction pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptoJs.SHA256(req.body.email, `${cryptoKey}` ).toString(); 
  User.findOne({ email: emailCryptoJs})
    .then(user => {
      if (!user){
        return res.status(401).json({ message: 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect !'});
          }
          res.status(200).json({
            //encodage du userId pour lier les données à l'utilisateur
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              `${jwtKey}`,
              {expiresIn: '12h'}
            )
          })
        })
        .catch(error => res.status(500).json({ error}));
    })
    .catch(error => res.status(500).json({ error}));
};