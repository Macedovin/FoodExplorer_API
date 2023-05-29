exports.up = knex => knex.schema.createTable('orders_statuses', table => {
  table.increments('id');
  table.integer('order_id').references('id').inTable('orders').onUpdate('CASCADE').onDelete('CASCADE');
  table.integer('status_id').references('id').inTable('statuses').onUpdate('CASCADE').onDelete('CASCADE');
});

exports.down = knex => knex.schema.dorpTable('orders_statuses');