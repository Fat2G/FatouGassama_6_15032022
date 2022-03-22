//import du package bcrypt
const bcrypt = require('bcrypt');

//import du modèle users
const User= require('../models/user');

//fonction pour l'enregistrement des utilisateurs
exports.signup = (req, res, next) => {
  //explication 3.3
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(err => res.status(400).json({ error }))
    })
    .catch(err => res.status(500).json({ error }));
};

//fonction pour la connection des utilisateurs existants
exports.login = (req, res, next) => {
  //explication 3.4
  User.findOne({ email: req.body.email})
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
            userId: user._id,
            token: 'TOKEN'
          })
        })
        .catch(err => res.status(500).json({ error}))
    })
    .catch(err => res.status(500).json({ error}));
};