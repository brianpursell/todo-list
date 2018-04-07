exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(table) {
    table.increments();
    table.string('name');
    table.specificType('is_complete', 'tinyint(1)');
    table.dateTime('deleted');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
