// tables associations

const Ticket = require('./Ticket');
const User = require('./User');
const Department = require('./Department');
const State = require('./State');


// tickets are created by a user
Ticket.belongsTo(User, { as: 'createdBy', foreignKey: 'created_by' });

// tickets are updated by a user
Ticket.belongsTo(User, { as: 'updatedBy', foreignKey: 'updated_by' });

// tickets have a state
Ticket.belongsTo(State, { foreignKey: 'id_state' });

// tickets has a department associated
Ticket.belongsTo(Department, { foreignKey: 'id_department' });


// users have a department associated
User.belongsTo(Department, { foreignKey: 'id_department' });

module.exports = { Ticket, User, Department, State };