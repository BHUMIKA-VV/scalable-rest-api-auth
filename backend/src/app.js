const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
