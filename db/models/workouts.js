const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  workout: String,
  weight: Number,
  sets: Number,
  repsPerSet: Number,
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;