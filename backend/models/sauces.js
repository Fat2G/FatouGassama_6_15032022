// import du package mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// schéma de données 
const thingSchema = mongoose.Schema({
  userId: { type: String, required: true},
  name: { type: String, required: true},
  manufacturer: { type: String, required: true},
  description: { type: String, required: true},
  mainPepper: { type: String, required: true},
  imageUrl: { type: String, required: true},
  heat: { type: Number, required: true},
  likes : { type: Number, default: 0, required: false},
  dislikes : { type: Number, default: 0, required: false},
  usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User'}], 
  usersDisliked: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});
 
// export du modèle en modèle utilisable grâce à la méthode 'model'
module.exports = mongoose.model('Thing', thingSchema);