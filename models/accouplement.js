const mongoose = require('mongoose');

const accouplementSchema = mongoose.Schema({
  IdAnimal:String,
  Description:String,
  Data:String,
  valide:Boolean
});

const accouplement = mongoose.model('accouplement', accouplementSchema);

module.exports = accouplement;