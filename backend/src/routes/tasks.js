const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { Task } = require('../models');

router.use(authenticate);

router.get('/', async (req, res) => {
	const user = req.user;
	if (user.role === 'admin') {
		const tasks = await Task.findAll();
		return res.json({ tasks });
	}
	const tasks = await Task.findAll({ where: { ownerId: user.id } });
	return res.json({ tasks });
});

router.post('/', async (req, res) => {
	const user = req.user;
	const { title, description } = req.body;
	const task = await Task.create({ title, description, ownerId: user.id });
	return res.status(201).json(task);
});

router.get('/:id', async (req, res) => {
	const task = await Task.findByPk(req.params.id);
	if (!task) return res.status(404).json({ error: 'not found' });
	if (task.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
	return res.json(task);
});

router.put('/:id', async (req, res) => {
	const task = await Task.findByPk(req.params.id);
	if (!task) return res.status(404).json({ error: 'not found' });
	if (task.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
	const { title, description, completed } = req.body;
	task.title = title ?? task.title;
	task.description = description ?? task.description;
	if (typeof completed === 'boolean') task.completed = completed;
	await task.save();
	return res.json(task);
});

router.delete('/:id', async (req, res) => {
	const task = await Task.findByPk(req.params.id);
	if (!task) return res.status(404).json({ error: 'not found' });
	if (task.ownerId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
	await task.destroy();
	return res.status(204).end();
});

module.exports = router;
