const express = require('express');
const router = express.Router();
const Department = require('../models/Department');


// GET /departments - List all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ['id', 'title'],
    });
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar departamentos.' });
  }
});


// POST /departments/create - Create a new department
router.post('/create', async (req, res) => {
  const { id, title } = req.body;

  try {
    const department = await Department.create({ id, title });
    res.status(201).json({ message: 'Department created successfully!', department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
