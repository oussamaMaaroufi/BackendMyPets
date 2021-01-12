const mongoose = require('mongoose');

const interesseSchema = mongoose.Schema({
  IdUser:String,
  Idaccouplement:String,
  
});

const Interesse = mongoose.model('interesse', interesseSchema);

module.exports = Interesse;