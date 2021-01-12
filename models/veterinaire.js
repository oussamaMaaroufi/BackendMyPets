const mongoose = require('mongoose');

const veterinaireSchema = mongoose.Schema({
  IdUser:String,
  name : String,
  image:String,
  telephon:String,
  Adresse:String,
});

const veterinaire = mongoose.model('veterinaire', veterinaireSchema);

module.exports = veterinaire;