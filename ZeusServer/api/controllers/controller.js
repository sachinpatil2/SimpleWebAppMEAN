"use strict";

module.exports = function (app) {
var mongo = require('../models/mongo');
var url = "mongodb://localhost:27017/zeuslearning";

var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var dbInstance = null;

mongo.connect(url,function(err,db){
  console.log("database created"+db);
  dbInstance=db;
});

app.get('/listUsers', function (req, res) {
  mongo.findUsers(dbInstance,function(err,result){
    console.log("result of listUsers: "+result);
    res.json( result );
    res.end();
  });
});
app.post('/addUser', function (req, res) {
   console.log("request: ",req.body);
   mongo.insertUser(dbInstance,req.body,function(err,result){
     res.json( result );
     res.end();
   });

});
app.get('/:id', function (req, res) {
   console.log("ID: "+req.params.id);
   var id = req.params.id;
   mongo.findUser(dbInstance,id,function(err,result){
     res.json( result );
     res.end();
   });

});

app.put('/updateUser', function(req, res){

  mongo.updateUser(dbInstance,req.body,function(err,result){
    res.json( result );
    res.end();
  });

});
  app.delete('/:id', function (req, res) {
    var id = req.params.id;
    mongo.deleteUser(dbInstance,id,function(err,result){
      res.json( result );
      res.end();
    });

  });
};
