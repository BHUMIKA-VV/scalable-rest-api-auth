const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');

function signAccess(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
}

function signRefresh() {
  return crypto.randomBytes(40).toString('hex');
}

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await User.create({ email, password, role: role || 'user' });
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await user.validatePassword(password);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const accessToken = signAccess(user);
  const refreshToken = signRefresh();
  user.refreshToken = refreshToken;
  await user.save();
  return res.json({ accessToken, refreshToken });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'missing refreshToken' });
  const user = await User.findOne({ where: { refreshToken } });
  if (!user) return res.status(401).json({ error: 'invalid refresh token' });
  // rotate
  const newRefresh = signRefresh();
  user.refreshToken = newRefresh;
  await user.save();
  const accessToken = signAccess(user);
  return res.json({ accessToken, refreshToken: newRefresh });
});

router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'missing refreshToken' });
  const user = await User.findOne({ where: { refreshToken } });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
  return res.status(204).end();
});

module.exports = router;
