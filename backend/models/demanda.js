var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demandaSchema = new Schema({
  tema: String,
  estadoAtual: String,
  protocolo: String,  
  forum: String,
  anoCriacao: Number,
  anoConclusao: Number,
  comentario: String,
  secretariaOuAutarquia: String,
  valor: Number,
  demanda: String
});

var Demanda = mongoose.model('Demanda', demandaSchema);

module.exports = Demanda;