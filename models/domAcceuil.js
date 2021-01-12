const mongoose = require('mongoose');

const DomacceuilSchema = mongoose.Schema({
  IdUser:String, 
  IdAcceuil:String,
  valide:Boolean
});

const DomAcceuil = mongoose.model('domacceuil', DomacceuilSchema);

module.exports = DomAcceuil;