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

  console.log('Incoming workout save request:', req.body);

  // Validate request body
  if (!username || !name || !Array.isArray(exercises)) {
    console.error('Invalid data:', req.body);
    return res.status(400).json({ error: 'Invalid data. Please provide username, name, and exercises.' });
  }

  // Validate each exercise
  const invalidExercises = exercises.filter((ex) => !ex.name || ex.name.trim() === '');
  if (invalidExercises.length > 0) {
    console.error('Invalid exercises:', invalidExercises);
    return res.status(400).json({ error: 'All exercises must have a valid name.' });
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

