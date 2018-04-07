module.exports.db = require('knex')({
  client: process.env.DB_TYPE || 'mysql',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'todos'
  }
});
