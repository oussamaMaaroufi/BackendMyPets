const mongoose = require('mongoose');

const UrgenceSchema = mongoose.Schema({
  IdUser:String,
  Idveto:String,
  IdAnimal:String,
  Data:String,
  valide:Boolean
});

const Urgence = mongoose.model('urgence', UrgenceSchema);

module.exports = Urgence;