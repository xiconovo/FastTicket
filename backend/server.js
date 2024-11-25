const express = require('express');
const sequelize = require('./config/database');
const { Ticket, User, Department, State } = require('./models/associations');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3010;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware CORS to take frontend requests
app.use(cors({
    origin: 'http://localhost:5173', // URL of the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers allowed
}));


// routes
const { router: authRoutes } = require('./routes/auth')
app.use('/auth', authRoutes);
const departmentsRoutes = require('./routes/departments')
app.use('/departments', departmentsRoutes)
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
const ticketRoutes = require('./routes/tickets');
app.use('/tickets', ticketRoutes);
const statesRoutes = require('./routes/states');
app.use('/states', statesRoutes);





// Sync models with the database
sequelize.sync({ force: false }) // Does not overwrite existing tables
    .then(() => console.log('Models synced with the database!'))
    .catch(err => console.error('Error syncing models:', err));

// Test route to verify server status
app.get('/', (req, res) => {
    res.send('Server is running.');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
