
exports.up = function(knex) {
  return knex.schema.table('costs', function(table){
    table.renameColumn('$/min','cost_per_min')
  })
};

exports.down = function(knex) {
  
};
