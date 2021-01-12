const mongoose = require('mongoose');

const acceuilSchema = mongoose.Schema({
  IdUser:String, 
  IdAnimal:String,
  Description:String,
  valide:Boolean
});

const Acceuil = mongoose.model('acceuil', acceuilSchema);

module.exports = Acceuil;