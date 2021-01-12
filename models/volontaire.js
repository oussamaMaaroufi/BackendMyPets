const mongoose = require('mongoose');
const user = require("./user")
const volontaireSchema = mongoose.Schema({
  IdUser:String,
  telephon:String,
  Adresse:String,
  image:String,
  
});

const volontaire = mongoose.model('volontaire', volontaireSchema);

module.exports = volontaire;