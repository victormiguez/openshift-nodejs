var Demanda = require('../models/demanda.js');
var url     = require('url');
var fs      = require('fs');

exports.obterTodas = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var filtros = {};

  query.protocolo ? filtros.protocolo = query.protocolo : '';
  query.tema ? filtros.tema = query.tema : '';
  query.anoCriacao ? filtros.anoCriacao = parseInt(query.anoCriacao) : '';
  query.demanda ? filtros.demanda = new RegExp(query.demanda) : '';

  Demanda.where(filtros).exec(function(err, demandas) {
    if (err) return res.status(500).send(err);

    return res.json(demandas);
  });

  //Demanda.remove({}).exec();
};

exports.inserir = function(req, res) {
  var demanda = new Demanda({
    tema: req.body.tema,
    estadoAtual: req.body.estadoAtual
  });

  demanda.save();

  return res.json(demanda);
};

exports.importar = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  var obj = JSON.parse(fs.readFileSync('E:\\Projetos\\dadosabertos\\dados\\' + query.arquivo, 'utf8'));

  for (var i = 0; i < obj.length; i++) {
    
    var demanda = new Demanda({
      protocolo: obj[i]['Protocolo'],
      tema: obj[i]['Tema da demanda'],
      forum: obj[i]['Fórum'],
      anoCriacao: obj[i]['Ano da criação'],
      anoConclusao: obj[i]['Ano da conclusão'],
      estadoAtual: obj[i]['Estado atual'],
      comentario: obj[i]['Comentário'],
      secretariaOuAutarquia: obj[i]['Secretaria ou Autarquia'],
      valor: obj[i]['Valor'],
      demanda: obj[i]['Demanda']
    });

    demanda.save();

  };

  return res.json(':)');
};