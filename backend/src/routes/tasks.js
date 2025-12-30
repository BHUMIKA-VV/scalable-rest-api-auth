const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ tasks: [] }));
router.post('/', (req, res) => res.status(201).json({ id: 1 }));
router.get('/:id', (req, res) => res.json({ id: req.params.id }));
router.put('/:id', (req, res) => res.json({ id: req.params.id }));
router.delete('/:id', (req, res) => res.status(204).end());

module.exports = router;
