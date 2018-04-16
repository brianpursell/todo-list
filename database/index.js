const knexfile = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(knexfile);

module.exports = {
  getTodos: () => {
    return db('todos').where('deleted', null);
  },
  addTodo: todo => {
    return db('todos').insert(todo);
  },
  editTodo: todo => {
    return db('todos')
      .where('id', todo.id)
      .update(todo);
  },
  deleteTodo: id => {
    let date = new Date();
    return db('todos')
      .where('id', id)
      .update('deleted', date);
  },
  changeTodoStatus: (id, status) => {
    return db('todos')
      .where('id', id)
      .update('is_complete', status);
  },
  findByUsername: (username, cb) => {
    db('users')
      .where('username', username)
      .first()
      .then(user => {
        cb(null, user);
      })
      .catch(err => {
        cb(err, null);
      });
  },
  findById: (id, cb) => {
    db('users')
      .where('id', id)
      .first()
      .then(user => {
        cb(null, user);
      })
      .catch(err => {
        cb(err, null);
      });
  }
};
