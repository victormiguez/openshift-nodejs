var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demandaSchema = new Schema({
  tema: { type: String },  
  estadoAtual: { type: String }
});

var Demanda = mongoose.model('Demanda', demandaSchema);

module.exports = Demanda;