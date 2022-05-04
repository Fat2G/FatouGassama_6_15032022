/*// utilisation des variables d'environnement pour cacher les données sensibles
require('dotenv').config();

//import du package bcrypt
const bcrypt = require('bcrypt');
//import du package jsonwebtoken
const jwt = require('jsonwebtoken');
//import du package crypto-js pour chiffrer le mail
const cryptoJs = require('crypto-js');

//import du modèle utilisateur
const User= require('../models/user');

//fonction pour l'enregistrement des utilisateurs
exports.signup = (req, res, next) => {
  // chiffrage de l'email 
  //const emailCryptoJs = cryptoJs.SHA256(req.body.email, process.env.CRYPTOJS_KEY_EMAIL).toString();
  // hashage du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      // Enregistrement de l'utilisateur dans la base de données
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ message : 'Utilisateur déjà existant !' }))
    })
    .catch(error => res.status(500).json({ error }));
};

//fonction pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {
  // const emailCryptoJs = cryptoJs.SHA256(req.body.email, process.env.CRYPTOJS_KEY_EMAIL).toString(); 
  // recherche de l'email encryptée de l'utilisateur
  User.findOne({ email: req.body.email})
    .then(user => {
      if (!user){
        return res.status(401).json({ message: 'Utilisateur non trouvé !'});
      }
      //comparaison du mot de passe tapé à celui de la base de données
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect !'});
          }
          res.status(200).json({
            //Le mot de passe correspond et l'utilisateur reçoit un token encodé d'une durée de 12h
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              process.env.JWT_KEY,
              {expiresIn: '12h'}
            )
          })
        })
        .catch(error => res.status(500).json({ error}));
    })
    .catch(error => res.status(500).json({ error}));
};*/

// IMPORTS
// utilisation des variables d'environnement pour cacher les données sensibles
require("dotenv").config(); // Importation du package 'dotenv'
//import du modèle utilisateur
const User = require("../models/User");
//import du package bcrypt
const bcrypt = require("bcrypt"); 
//import du package jsonwebtoken pour l'encodage des tokens
const jwt = require("jsonwebtoken");

//fonction pour l'enregistrement des utilisateurs
exports.signup = (req, res, next) => {
  // hashage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Création du nouvel utilisateur
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // Enregistrement de l'utilisateur dans la base de données
      user.save()
        .then(() => {
          res.status(201).json({ message: "Utilisateur crée !" });
        })
        .catch( error => res.status(400).json({ error })
        );
    })
    .catch(error => res.status(500).json({ error }));
};

//fonction pour la connexion des utilisateurs existants
exports.login = (req, res, next) => {
  // recherche de l'utilisateur dans la base de données
  User.findOne({ email: req.body.email })
    .then(user => {
      // si utilisateur non trouvé
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé !" });
      }
      // si utilisateur trouvé
      // comparaison du mot de passe envoyé avec celui hashé dans la base de données
      bcrypt.compare(req.body.password, user.password)
        .then( valid => {
          // si le mot de passe ne correspond pas
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect !" });
          }
          // si le mot de passe correspond et l'utilisateur reçoit un token encodé d'une durée de 12h
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_TOKEN,
              { expiresIn: "12h" }
            )
          })
        })
        .catch( error => res.status(500).json({ error }));
    })
    .catch( error => res.status(500).json({ error }));
};