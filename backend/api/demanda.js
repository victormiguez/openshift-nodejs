var Demanda = require('../models/demanda.js');
var url = require('url');

exports.obterTodas = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  console.log(query.tema);

  Demanda.where('tema', query.tema).exec(function(err, demandas) {
    if (err) return res.status(500).send(err);

    return res.json(demandas);
  });
};

exports.inserir = function(req, res) {
  var demanda = new Demanda({
    tema: req.body.tema,
    estadoAtual: req.body.estadoAtual
  });

  demanda.save();

  return res.json(demanda);
};