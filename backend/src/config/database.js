const { Sequelize } = require('sequelize');

function createSequelize() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (process.env.NODE_ENV === 'test') {
    return new Sequelize('sqlite::memory:', { logging: false });
  }
  if (DATABASE_URL) {
    return new Sequelize(DATABASE_URL, { dialect: 'postgres', logging: false });
  }
  return new Sequelize({ dialect: 'sqlite', storage: './backend/dev.sqlite', logging: false });
}

module.exports = createSequelize;
