const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false
};

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, config
)

if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

module.exports = db;
