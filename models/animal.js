const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
      IdUser:String,
      Type:String,
      Name:String,
      Race:String,
      Image:String
});

const animal = mongoose.model('animal', animalSchema);

module.exports = animal;