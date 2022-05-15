// Import du modèle sauce
const Thing = require('../models/sauces');
// Import du package file system 'fs'
const fs = require('fs');

// création de la sauce
exports.createThing = (req, res, next) => {
  // parse de la chaine de caractère en objet
  const thingObject = JSON.parse(req.body.sauce);
  // suppression de l'id utilisateur 
  delete thingObject._id;
  // création d'une nouvelle sauce
  const thing = new Thing({    
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  // enregistrement de la sauce dans la base de données
  thing.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

// récupération d'une sauce
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

// récupération de toutes les sauces
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }))
};

// modification de la sauce
exports.modifyThing = (req, res, next) => {
  // si l'image est modifiée, celle d'avant sera supprimée
  if (req.file) {
    Thing.findOne({ _id: req.params.id })
      .then((sauce) => {
        // récupération du nom de la photo à supprimer dans la base de données
        const filename = sauce.imageUrl.split("/images")[1];
        // suppression de l'image dans le dossier 'images' du serveur
        fs.unlink(`images/${filename}`,
        (error) => {
          if (error) {
            throw error;
          }
        });
      })
      .catch(function (error) {
        response.status(400).json({ error });
      });
  }
  //mise a jour de la sauce
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'})) 
    .catch(error => res.status(400).json({ error }));
};

// suppression de la sauce
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {

      const filename = thing.imageUrl.split('/images/')[1];
      // utilisation de la méthode unlink du package 'fs' pour supprimer le fichier
      fs.unlink(`images/${filename}`, ()=> {
        // supression de la sauce dans la base de données
        Thing.deleteOne({ _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// définition du comportement du statut "Like" 
exports.likeOrDislike = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

  Thing.findOne({_id: sauceId})
    .then((sauce) => {
      // cas où l'utilisateur clique sur le bouton "like"
      if(!sauce.usersLiked.includes(userId) && like === 1){
        // la sauce est mise à jour et les "likes" sont incrémentés de +1.
        // l' ID de l'utilisateur est implémenté dans le tableau usersLiked afin qu'il ne puisse donner son avis qu'une seule fois.
        Thing.updateOne({ _id: sauceId }, {$inc: { likes: +1 }, $push: { usersLiked: userId }})
          .then(() => res.status(200).json({ message: "Like ajouté !" }))
          .catch(error => res.status(400).json({error}));
      } 

      // cas où l'utilisateur ayant cliqué sur "like" annule son choix.
      // l' ID de l'utilisateur est retiré du tableau usersLiked afin qu'il puisse faire un autre choix. 
      else if(sauce.usersLiked.includes(userId) && like === 0){
        Thing.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: userId }})
          .then(() => res.status(200).json({ message: "Like supprimé !" }))
          .catch(error => res.status(400).json({ error }));
      } 

      // cas où l'utilisateur clique sur le bouton "dislike"
      else if(!sauce.usersDisliked.includes(userId) && like === -1){ 
        Thing.updateOne({ _id: sauceId }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId }})
          .then(() => res.status(200).json({message: "Dislike ajouté !"}))
          .catch(error => res.status(400).json({ error }));
      }

      // cas où l'utilisateur ayant cliqué sur "dislike" annule son choix
      else if(sauce.usersDisliked.includes(userId) && like === 0){ 
        Thing.updateOne({ _id: sauceId }, {$inc: { dislikes: -1 }, $pull: { usersDisliked: userId }})
          .then(() => res.status(200).json({ message: "Dislike supprimé !" }))
          .catch(error => res.status(400).json({ error }));
      } else {
        return res.status(401).json({ message: "Opération non effectuée !" });
      }
    })
    .catch(error => res.status(400).json({ error }));
};
