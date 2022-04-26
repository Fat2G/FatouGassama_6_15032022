//import du package jsonwebtoken pour encodage des tokens
const jwt = require('jsonwebtoken');

// variables d'environnement pour les odnnées sensibles
require('dotenv').config();

//export du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    // récupération du token 
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    // vérification de l'ID de l'utilisateur par rapport à celui du corps de la requête
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable!';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !'})
  }
};