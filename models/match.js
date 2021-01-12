const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
  IdUser1:String, 
  IdUser2 :String, 
});

const match = mongoose.model('match', matchSchema);

module.exports = match;