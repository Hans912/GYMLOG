const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Get all past workouts for a user
router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    const workouts = await Workout.find({ username });
    res.status(200).json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching workouts');
  }
});

// Save a completed workout
router.post('/save', async (req, res) => {
  const { username, name, exercises } = req.body;

  if (!username || !name || !Array.isArray(exercises)) {
    return res.status(400).send('Invalid data. Please provide username, name, and exercises.');
  }

  try {
    const workout = new Workout({ username, name, exercises });
    await workout.save();
    res.status(200).send('Workout saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving workout');
  }
});

module.exports = router;

