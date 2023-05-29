exports.up = knex => knex.schema.createTable('statuses', table => {
  table.increments('id');
  table.text('value').notNullable();
})

exports.down =  knex => knex.schema.dropTable('statuses');