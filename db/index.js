const { knex } = require('../knexfile');

// knex.schema.hasTable('categories').then(function(exists) {
//   if (!exists) {
//     return knex.schema.createTable('categories', function(table) {
//       table.increments('id');
//       table.string('name');
//       table.decimal('max_amount');
//     });
//   }
// });

module.exports = {
  categories: knex('categories')
  // addCategory: knex('categories').insert(data)
};
