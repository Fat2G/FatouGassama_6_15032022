// variables d'environnement pour les données sensibles
require('dotenv').config();

//import du package jsonwebtoken pour encodage des tokens
const jwt = require('jsonwebtoken');

//export du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    // récupération du token 
    const token = req.headers.authorization.split(' ')[1];
    // Décodage du token avec pour arguments le token à vérifier et la clé d'encodage
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // Extraire le 'userId' qui est à l'intérieur
    const userId = decodedToken.userId;
    // vérification de l'ID de l'utilisateur par rapport à celui du corps de la requête
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};