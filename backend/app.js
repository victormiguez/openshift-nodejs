var express = require("express");
var app     = express();
var path    = require("path");

var assetsPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(assetsPath))

app.get('*',function(req,res){
  res.sendFile(assetsPath + "/");
});

app.listen(3000);

console.log("Running at Port 3000");