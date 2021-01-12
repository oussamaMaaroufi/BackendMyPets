const mongoose = require('mongoose');

const abriSchema = mongoose.Schema({
  IdUser:String,
  name:String,
  image:String,
  telephon:String,
  Adresse:String,
});

const abri = mongoose.model('abri', abriSchema);

module.exports = abri;