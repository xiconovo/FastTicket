const express = require('express');
const router = express.Router();
const State = require('../models/State');
const { authenticateToken } = require('../routes/auth');

// GET /states - Lista todos os estados
router.get('/', authenticateToken, async (req, res) => {
    try {
        const states = await State.findAll({
            attributes: ['id', 'title'],
        });

        res.status(200).json(states);
    } catch (error) {
        console.error('Erro ao listar estados:', error);
        res.status(500).json({ error: 'Erro ao listar estados.' });
    }
});

module.exports = router;
