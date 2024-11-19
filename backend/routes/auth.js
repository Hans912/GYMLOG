const express = require('express');
const bcrypt = require('bcrypt');
const Account = require('../models/Account');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Account({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User created successfully!' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Account.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
