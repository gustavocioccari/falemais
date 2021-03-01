
exports.up = function(knex) {
  return knex.schema.createTable('plans', function(table){
    table.increments('id')
    table.string('plan').notNullable()
    table.integer('mins_free').notNullable()
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('plans')
};
