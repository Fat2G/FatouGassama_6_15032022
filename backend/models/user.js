//import du package mongoose
const mongoose = require('mongoose');

//import du validateur mongoose comme plug-in au schéma
const uniqueValidator = require('mongoose-unique-validator');

//création du schéma utilisateur
const userSchema = mongoose.Schema ({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }
});

//application du validateur au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

//export du schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);