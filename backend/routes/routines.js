const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// Save a new routine
router.post('/save', async (req, res) => {
  const { username, name, exercises } = req.body; // Extract data from the request body

  if (!username || !name || !Array.isArray(exercises)) {
    return res.status(400).send('Invalid data. Please provide username, name, and exercises.');
  }

  try {
    const routine = new Routine({ username, name, exercises }); // Create a new routine document
    await routine.save(); // Save to the database
    res.status(200).send('Routine saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving routine');
  }
});

module.exports = router;
