// import du package express
const express = require('express');
// création de l'application express
const app = express();
// import du package body-parser
const bodyParser = require('body-parser');
// import du package mongoose
const mongoose = require('mongoose');
// import du package path qui donne accès au chemin de fichiers
const path = require('path');
// import du package helmet
const helmet = require('helmet');
// import des routers utilisateurs et sauces
const userRoutes = require('./routes/user');
const saucesRoutes= require('./routes/sauces');

// utilisation des variables d'environnement pour cacher les données sensibles comme les identifiants mongoDB
require('dotenv').config();
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

//connexion au serveur mongoDB 
mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//headers permettant de connecter différents serveurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// middlewares
app.use(bodyParser.json());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;