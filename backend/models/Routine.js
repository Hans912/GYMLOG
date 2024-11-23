const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
  username: { type: String, required: true }, // To associate with a user
  name: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Routine', RoutineSchema);
