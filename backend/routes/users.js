const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../routes/auth');
const User = require('../models/User');
const Department = require('../models/Department');

// GET /user/get_info - Get user information
router.get('/get_info', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId, {
            include: { model: Department, attributes: ['id', 'title'] },
            attributes: ['id', 'name', 'email'],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PUT /user/update_info - Update user information
router.put('/update_info', authenticateToken, async (req, res) => {
    const { name, newPassword, currentPassword, id_department } = req.body;

    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect current password.' });
        }

        if (name) user.name = name;
        if (newPassword) user.password = await bcrypt.hash(newPassword, 10);
        if (id_department) user.id_department = id_department;

        await user.save();

        res.status(200).json({ message: 'User information updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
