
exports.up = function(knex) {
  return knex.schema.createTable('fees', function(table){
    table.int('id').primary()
    table.string('from', 3).notNullable()
    table.string('to', 3).notNullable()
    table.float('cost_per_min').notNullable()
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('fees')
};
