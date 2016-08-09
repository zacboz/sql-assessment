var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var massive = require('massive');
// var connString = "postgres://jeremyrobertson@localhost/sandbox";

var app = express();  
app.use(bodyParser.json());
app.use(cors());

// var db = massive.connectSync({connectionString : connString})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")	
})