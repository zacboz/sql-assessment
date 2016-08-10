var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connString = "postgres://postgres:postgres@localhost/assessbox";

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var app = express();

app.use(bodyParser.json());
app.use(cors());

var db = massive.connect({connectionString : connString}, function(err, localdb){
  db = localdb;
  app.set('db', db);
  // db.clear_tables();
  db.user_create_seed(function(){
    console.log("User_Create_Seed")
    console.log(arguments);
  });
  db.vehicle_create_seed(function(){
    console.log("Vehicle_Create_Seed")
    console.log(arguments);
  });
})


app.get('/api/users', function(req, res, next){
  db.read_users({}, function(err, users){
    res.send(users);
  });
})

app.post('/api/users', function(req, res, next){
  db.create_driver(req.body.firstname, req.body.lastname, req.body.email, function(err, user){
    res.send(user);
  })
})

app.get('/api/vehicles', function(req, res, next){
  db.read_vehicles({}, function(err, vehicles){
    res.send(vehicles);
  });
})

app.post('/api/vehicles', function(req, res, next){
  console.log(req.body);
  db.create_vehicle(req.body.make, req.body.model, req.body.year, req.body.ownerId, function(err, vehicle){
    if(err)console.log(err);
    res.send(vehicle);
  })
})

app.get('/api/user/:userId/vehiclecount', function (req, res){
  db.owner_vehicle_count(req.params.userId, function(err, result){
    if(err) console.log(err);
    res.send(result[0]);
  });
})

app.get('/api/newervehiclesbyyear', function(req, res){
  db.newervehicles(function(err, result){
    if(err) console.log(err);
    res.send(result);
  });
});

app.get('/api/user/:userId/vehicle', function (req, res){
  db.owner_vehicle(req.params.userId,  function(err, result){
    if(err) console.log(err);
    res.send(result);
  });
})

app.get('/api/vehicle', function (req, res){
  if (req.query.UserEmail){
    db.vehicles_by_email(req.query.UserEmail, function(err, result){
      if (err) console.log(err);
      // console.log(result);
      res.send(result);
    })
  }else if(req.query.userFirstStart){
    db.vehicles_by_firstname(req.query.userFirstStart+"%", function(err, result){
      if (err) console.log(err);
      res.send(result);
    })
  }else{
    res.status(404).send("Wrong Query Parameters")
  }

});

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res){
  db.assign_user(req.params.vehicleId, req.params.userId, function(err, result){
    if(err) console.log(err);
    res.send(result);
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res){
  db.remove_user(req.params.userId, req.params.vehicleId, function(err, result){
    if(err) console.log(err);
    res.send(result);
  });
});

app.delete('/api/vehicle/:vehicleId', function(req, res){
  db.remove_vehicle(req.params.vehicleId, function(err, result){
    if(err)console.log(err);
    res.send(result);
  })
});

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
