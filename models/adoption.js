const mongoose = require('mongoose');

const adoptionSchema = mongoose.Schema({
  IdUser:String, 
  IdAnimal:String,
  nameAnimal:String,
  image:String,
  Date:String,
  Description:String,
  valide:Boolean,
});

const adoption = mongoose.model('adoption', adoptionSchema);

module.exports = adoption;