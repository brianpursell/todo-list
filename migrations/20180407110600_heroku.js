exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todos', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.specificType('is_complete', 'tinyint(1)');
      table.dateTime('deleted');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('todos')]);
};
