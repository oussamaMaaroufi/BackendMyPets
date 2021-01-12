const mongoose = require('mongoose');

const lostAndFoundSchema = mongoose.Schema({
  IdUser:String,
  UserName:String,
  Type:String,
  Desc: String,
  Date:String,
  Image:String,
  valide:Boolean
});

const LostAndFound = mongoose.model('lostAndFound', lostAndFoundSchema);

module.exports = LostAndFound;