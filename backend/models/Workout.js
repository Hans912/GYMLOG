const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true }, // Name of the workout
  date: { type: Date, default: Date.now },
  exercises: [
    {
      name: { type: String, required: true }, // Exercise name
      sets: [
        {
          weight: { type: Number, required: true }, // Weight used
          reps: { type: Number, required: true }, // Reps completed
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Workout', WorkoutSchema);
