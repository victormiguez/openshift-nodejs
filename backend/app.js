var express   = require('express');
var app       = express();
var path      = require('path');
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://hackcidadao-op:cidadaoop-hack-dev@ds049661.mongolab.com:49661/hackcidadao-op');


var assetsPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(assetsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var api = {};

api.demanda = require('./api/demanda');

app.post('/api/demanda', api.demanda.inserir);
app.get('/api/demandas', api.demanda.obterTodas);

app.get('*',function(req,res){
  res.sendFile(assetsPath + '/');
});

app.listen(3000);

console.log('Running at Port 3000');