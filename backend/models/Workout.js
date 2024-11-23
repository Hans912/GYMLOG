const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  exercises: [
    {
      name: { type: String, required: true }, // Exercise name must not be empty
      sets: [
        {
          weight: { type: Number, required: true },
          reps: { type: Number, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Workout', WorkoutSchema);
