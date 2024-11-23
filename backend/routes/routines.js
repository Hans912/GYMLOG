const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// Get all routines for a user
router.get('/', async (req, res) => {
  const { username } = req.query; // username comes from query string
  try {
    const routines = await Routine.find({ username });
    res.json(routines);
  } catch (err) {
    res.status(500).send('Error fetching routines');
  }
});

// Save a new routine
router.post('/save', async (req, res) => {
  const { username, name, exercises } = req.body;
  try {
    const routine = new Routine({ username, name, exercises });
    await routine.save();
    res.status(200).send('Routine saved successfully');
  } catch (err) {
    res.status(500).send('Error saving routine');
  }
});

module.exports = router;
