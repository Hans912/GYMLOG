const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Account = require('../models/Account'); // Updated from '../models/User'

const router = express.Router();

// Signup
const express = require('express');
const bcrypt = require('bcryptjs');
const Account = require('../models/Account'); // Adjust model path if needed

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new Account({ username, password: hashedPassword });

    // Save user to database
    await user.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Account.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
