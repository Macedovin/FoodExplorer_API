exports.up = knex => knex.schema.createTable('user_roles', table => {
  table.increments('id');
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
  table.integer('role_id').references('id').inTable('roles').onDelete('CASCADE');

  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
}); 


exports.down = knex => knex.schema.dropTable('user_roles');
