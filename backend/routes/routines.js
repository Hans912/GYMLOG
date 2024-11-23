const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// Fetch all routines for a specific user
router.get('/', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const routines = await Routine.find({ username });
    res.status(200).json(routines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching routines' });
  }
});

// Fetch a single routine by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const routine = await Routine.findById(id);
    if (!routine) {
      return res.status(404).json({ error: 'Routine not found' });
    }
    res.status(200).json(routine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching routine' });
  }
});

// Save a new routine
router.post('/save', async (req, res) => {
  const { username, name, exercises } = req.body;

  if (!username || !name || !Array.isArray(exercises)) {
    return res.status(400).json({ error: 'Invalid data. Please provide username, name, and exercises.' });
  }

  try {
    const routine = new Routine({ username, name, exercises });
    await routine.save();
    res.status(200).json({ message: 'Routine saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving routine' });
  }
});

module.exports = router;
