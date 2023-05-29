exports.up = knex => knex.schema.createTable('dishes_orders', table => {
  table.increments('id');
  table.integer('quantity').notNullable();
  table.integer('dish_id').references('id').inTable('dishes').onUpdate('CASCADE').onDelete('CASCADE');
  table.integer('order_id').references('id').inTable('orders').onUpdate('CASCADE').onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTable('dishes_orders');