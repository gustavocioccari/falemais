
exports.up = function(knex) {
  return knex.schema.createTable('costs', function(table){
    table.string('id').primary()
    table.string('from', 3).notNullable()
    table.string('to', 3).notNullable()
    table.float('$/min').notNullable()
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('costs')
};
