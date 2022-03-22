const express = require('express');

//création d'un appplication Express en appelant la méthode
const app = express();

//import du package mongoose
const mongoose = require('mongoose');

//import du routeur
const userRoutes = require ('./routes/user');


//connection au serveur mongoDB 
mongoose.connect('mongodb+srv://Fat2:Gassfat1912@cluster0.hggih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//création de middleware pour s'assurer que le serveur fonctionne correctement
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

app.use('/api/auth', userRoutes);

module.exports = app;