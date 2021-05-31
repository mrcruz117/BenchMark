const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');
const controller = require('./controllers/workouts.js')
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

//post new workout to db
app.post('/workouts', controller.postWorkout)

//retrieve old workouts from db
app.get('/workouts', controller.getAll)



const Port = 7789;
app.listen(Port, () => {
  console.log(`Listening on Port http://localhost:${Port}` )
})