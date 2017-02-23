var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    app.get('/api/users', function(req, res){
      db.getAllUsers(function(err, response){
        if(err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(response);
        }
      })
    });

    app.get('/api/vehicles', function(req, res){
      db.getAllVehicles(function(err, response){
        if(err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(response);
        }
      })
    });

    app.post('/api/users', function(req, res){
      var newUser = req.body;
      var values = [newUser.firstname, newUser.lastname, newUser.email];
      db.addUser(values, function(err, response){
          res.status(200).json(response);
      })
    });

    app.post('/api/vehicles', function(req, res){
      var newCar = req.body;
      var values = [newCar.make, newCar.model, newCar.year, newCar.ownderId];
      db.addVehicle(values, function(err, response){
        if(err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(response);
        }
      })
    });

    app.get('/api/user/:userId/vehiclecount', function(req, res) {
      db.getVehicleCount([req.params.userId], function(err, response){
        if(err) {
          res.status(500).json(err);
        } else {
          // console.log(response[0]);
          res.status(200).json(response[0]);
        }
      })
    });

    app.get('/api/user/:userId/vehicle', function(req, res) {
      db.getAllUsersVehicles([req.params.userId], function(err, response){
        // console.log(response);
        res.status(200).json(response);
      })
    });

    app.get('/api/vehicle', function(req, res) {
      console.log('1', req.query);
      var email = req.query.UserEmail;
      console.log('2', email);
      var letters = '%';
      letters += req.query.userFirstStart;
      letters += '%';
      console.log('3', letters);
      if (email){
        db.getByEmail([email], function(err, response){
            res.status(200).json(response);
        })
      } else if (letters) {
        db.getByFirstName([letters], function(err, response) {
          res.status(200).json(response);
        })
      }
    });

    app.get('/api/newervehiclesbyyear', function(req, res) {
      db.newerVehicles(function(err, response){
        res.status(200).json(response);
      })
    });

    app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res){
      var v = req.params.vehicleId;
      var u = req.params.userId;
      // console.log(v);
      // console.log(u);
      db.updateOwner([v, u], function(err, response){
        res.status(200).json(response);
      })
    });

    app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res){
      var v = req.params.vehicleId;
      var u = req.params.userId;
      // console.log('hello', req.params);
      db.removeOwner([v], function(err, response){
        res.status(200).json(response);
      })
    });

    app.delete('/api/vehicle/:vehicleId', function(req, res){
      // console.log('hello', req.params);
      var v = req.params.vehicleId;
      db.deleteVehicle([v], function(err, response){
        res.status(200).json(response);
      })
    });




    //
    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;

// app.get('/attributes/:id', function(req, res){
//   db.getAttributes([req.params.id], function(err, attrs){
//     if(err) {
//       res.status(500).json(err);
//     }
//     else {
//       res.status(200).json(attrs);
//     }
//   })
// } )
