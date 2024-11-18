const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Account = require('../models/Account'); // Updated from '../models/User'

const router = express.Router();

//Sign up
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const user = new Account({ username, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Account.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
