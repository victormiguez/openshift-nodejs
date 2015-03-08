var express   = require("express");
var app       = express();
var path      = require("path");
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://miguez:live3735@ds053251.mongolab.com:53251/miguez');

var assetsPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(assetsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var api = {};

// api.demanda = require('./api/demanda');

// app.post('/api/demanda', api.demanda.inserir);
// app.get('/api/demandas', api.demanda.obterTodas);

app.get('*',function(req,res){
  res.sendFile(assetsPath + "/");
});

app.listen(3000);

console.log("Running at Port 3000");