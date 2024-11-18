const express = require('express');
const jwt = require('jsonwebtoken');
const Workout = require('../models/Workout');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get workouts
router.get('/', verifyToken, async (req, res) => {
  const workouts = await Workout.find({ userId: req.userId });
  res.json(workouts);
});

// Add workout
router.post('/', verifyToken, async (req, res) => {
  const workout = new Workout({ ...req.body, userId: req.userId });
  await workout.save();
  res.status(201).json(workout);
});

module.exports = router;
