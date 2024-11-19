const express = require('express');
const bcrypt = require('bcrypt');
const Account = require('../models/Account');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Account({ username, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      }
      console.error('Error during signup:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
