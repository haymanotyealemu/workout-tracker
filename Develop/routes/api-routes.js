const db = require("../models");
module.exports = function(app){
    // Get workouts
    app.get("/api/workouts/",(req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            dbWorkout.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;
            });
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
    // Create Workout
    app.post("/api/workouts", ({body}, res) => {
        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err =>{
            res.json(err);
        });
    });
}