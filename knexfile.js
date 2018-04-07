module.exports.db = require('knex')({
  client: 'mysql',
  connection: CLEARDB_DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'todos'
  }
});
