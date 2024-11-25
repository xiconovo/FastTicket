const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { authenticateToken } = require('../routes/auth');
const State = require('../models/State');
const Department = require('../models/Department');


// POST /tickets/create - Cria um novo ticket
router.post('/create_ticket', authenticateToken, async (req, res) => {
    const { title, description, department_title } = req.body;

    try {
        if (!title || !description || !department_title) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const department = await Department.findOne({ where: { title: department_title } });

        if (!department) {
            return res.status(404).json({ error: 'Departamento não encontrado!' });
        }

        const pendingState = await State.findOne({ where: { title: 'Pendente' } });
        if (!pendingState) {
            return res.status(404).json({ error: 'Estado "Pendente" não encontrado!' });
        }

        const ticket = await Ticket.create({
            title,
            description,
            id_department: department.id,
            id_state: pendingState.id,
            created_by: req.user.id,
        });

        res.status(201).json({
            message: 'Ticket criado com sucesso!',
            ticket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar ticket.' });
    }
});

// PUT /tickets/update_state - Atualiza o estado de um ticket
router.put('/update_ticket', authenticateToken, async (req, res) => {
    const { id, stateTitle, observacoes } = req.body;

    try {
        const ticket = await Ticket.findByPk(id, {
            include: [
                { model: State, attributes: ['title'] },
            ],
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket não encontrado!' });
        }

        const state = await State.findOne({ where: { title: stateTitle } });
        if (!state) {
            return res.status(400).json({ error: 'Estado inválido!' });
        }

        if (ticket.State.title === 'Recusado' || ticket.State.title === 'Finalizado') {
            return res.status(400).json({ error: 'Tickets recusados ou finalizados não podem ser alterados!' });
        }

        if (state.title === 'Recusado' && (!observacoes || observacoes.trim() === '')) {
            return res.status(400).json({ error: 'Observações são obrigatórias para recusar um ticket!' });
        }

        ticket.id_state = state.id;
        ticket.observacoes = observacoes || '';
        await ticket.save();

        res.json({ message: 'Ticket atualizado com sucesso!', ticket });
    } catch (error) {
        console.error('Erro ao atualizar ticket:', error);
        res.status(500).json({ error: 'Erro ao atualizar ticket.' });
    }
});



router.get('/get_ticket_details/:id', authenticateToken, async (req, res) => {
    const ticketId = req.params.id;
    const user = req.user;

    try {
        const ticket = await Ticket.findByPk(ticketId, {
            include: [
                {
                    model: Department,
                    attributes: ['title'],
                },
                {
                    model: State,
                    attributes: ['title'],
                },
                {
                    model: User,
                    as: 'createdBy',
                    attributes: ['id', 'name', 'email', 'id_department'],
                },
                {
                    model: User,
                    as: 'updatedBy',
                    attributes: ['name', 'email'],
                },
            ],
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket não encontrado!' });
        }

        const isCreator = ticket.createdBy.id === user.id;
        const isInDepartment = ticket.id_department === user.id_department;
        const isAdmin = user.admin;

        if (!isCreator && !isInDepartment && !isAdmin) {
            return res.status(403).json({
                error: 'Você não tem permissão para visualizar os detalhes deste ticket.',
            });
        }

        res.status(200).json({
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            observacoes: ticket.observacoes,
            created_at: ticket.createdAt,
            updated_at: ticket.updatedAt,
            department: ticket.Department ? ticket.Department.title : null,
            state: ticket.State ? ticket.State.title : null,
            creator: ticket.createdBy
                ? {
                    name: ticket.createdBy.name,
                    email: ticket.createdBy.email,
                }
                : null,
            updater: ticket.updatedBy
                ? {
                    name: ticket.updatedBy.name,
                    email: ticket.updatedBy.email,
                }
                : null,
        });
    } catch (error) {
        console.error('Erro ao obter detalhes do ticket:', error);
        res.status(500).json({ error: 'Erro ao obter os detalhes do ticket.' });
    }
});






router.get('/list_tickets', authenticateToken, async (req, res) => {
    const { states, text, offset = 0, limit = 10 } = req.query;
    console.log('Received states filter:', states);
    const user = req.user;

    try {
        const userWithDepartment = await User.findByPk(user.id, {
            include: {
                model: Department,
                attributes: ['id'],
            },
        });

        if (!userWithDepartment || !userWithDepartment.Department) {
            return res.status(400).json({ error: 'Departamento do utilizador não definido!' });
        }

        const userDepartmentId = userWithDepartment.Department.id;

        const whereConditions = {};

        if (states) {
            const stateArray = states.split(',').map((s) => s.trim());
            if (stateArray.length > 0) {
                whereConditions['$State.title$'] = { [Op.in]: stateArray }; // Filtra pelo título do estado
            }
        }

        // Filtro por texto
        if (text) {
            whereConditions[Op.or] = [
                { title: { [Op.like]: `%${text}%` } },
                { description: { [Op.like]: `%${text}%` } },
                Sequelize.literal(`Department.title LIKE '%${text}%'`),
                Sequelize.literal(`State.title LIKE '%${text}%'`),
            ];
        }

        if (!user.admin) {
            whereConditions[Op.or] = [
                { created_by: user.id },
                { id_department: userDepartmentId },
            ];
        }

        // Busca os tickets com os filtros e paginação
        const tickets = await Ticket.findAll({
            where: whereConditions,
            include: [
                { model: Department, attributes: ['title'] },
                { model: State, attributes: ['title'] },
            ],
            offset: parseInt(offset, 10),
            limit: parseInt(limit, 10),
            order: [['createdAt', 'DESC']], // Ordenação por data de criação
        });

        res.status(200).json({ tickets });
    } catch (error) {
        console.error('Erro ao listar tickets:', error);
        res.status(500).json({ error: 'Erro ao listar tickets.' });
    }
});



module.exports = router;