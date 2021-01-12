const mongoose = require('mongoose');

const rendezVousSchema = mongoose.Schema({
  IdVeto:String,
  IdVolo:String, 
  IdAnimal:String,
  Date:String,
  name : String,
  valide:Boolean
});

const rendezVous = mongoose.model('rendezVous', rendezVousSchema);

module.exports = rendezVous;