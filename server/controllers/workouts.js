const Workout = require('../../db/models/workouts');

module.exports = {
  getAll: (req, res) => {
    Workout.find({}).exec()
      .then(workouts => {

        console.log('workouts pulled from db: ', workouts);
        res.status(200).send(workouts);
      })
      .catch(err => {
        console.error('ERROR pulling workouts from db', err);
      });
    },

    //add post
    postWorkout: (req, res) => {
      console.log(req.body)
      const workout = new Workout(req.body);

      workout.save()
        .then(() => {
          console.log('save successful')
          res.status(201).end()
        })
        .catch(err => {
          console.error('ERROR adding workout to db', err);
          res.status(500).send(err)
        });
    }

}