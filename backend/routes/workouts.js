const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get all past workouts for a user
router.get('/', async (req, res) => {
  const { username } = req.query;
  try {
    const workouts = await Workout.find({ username });
    res.json(workouts);
  } catch (err) {
    res.status(500).send('Error fetching workouts');
  }
});

// Save a completed workout
router.post('/save', async (req, res) => {
  const { username, name, exercises } = req.body;
  try {
    const workout = new Workout({ username, name, exercises });
    await workout.save();
    res.status(200).send('Workout saved successfully');
  } catch (err) {
    res.status(500).send('Error saving workout');
  }
});

module.exports = router;
