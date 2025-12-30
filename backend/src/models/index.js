const createSequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const sequelize = createSequelize();

const User = require('./user')(sequelize, DataTypes);
const Task = require('./task')(sequelize, DataTypes);

User.hasMany(Task, { foreignKey: 'ownerId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = { sequelize, User, Task };
