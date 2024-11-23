const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// Get all routines for a user
router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    const routines = await Routine.find({ username });
    res.status(200).json(routines);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching routines');
  }
});

// Save a new routine
router.post('/save', async (req, res) => {
  const { username, name, exercises } = req.body;

  if (!username || !name || !Array.isArray(exercises)) {
    return res.status(400).send('Invalid data. Please provide username, name, and exercises.');
  }

  try {
    const routine = new Routine({ username, name, exercises });
    await routine.save();
    res.status(200).send('Routine saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving routine');
  }
});

module.exports = router;

