const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  userId: { type: String, required: true},
  name: { type: String, required: true},
  manufacturer: { type: String, required: true},
  description: { type: String, required: true},
  mainPepper: { type: String, required: true},
  imageUrl: { type: String, required: true},
  heat: { type: number, required: true},
  usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User'}], 
  usersDisliked: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Thing', thingSchema);