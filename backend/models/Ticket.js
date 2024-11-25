// ticket table

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
  },
  id_state: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_department: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observacoes: {
    type: DataTypes.TEXT,
  },
});

module.exports = Ticket;
