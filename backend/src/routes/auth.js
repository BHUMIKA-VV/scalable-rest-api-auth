const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'register endpoint (stub)' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'login endpoint (stub)' });
});

router.post('/refresh', (req, res) => {
  res.json({ message: 'refresh endpoint (stub)' });
});

module.exports = router;
