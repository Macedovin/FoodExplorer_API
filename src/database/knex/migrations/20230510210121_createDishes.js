exports.up = knex =>knex.schema.createTable('dishes', table => {
  table.increments('id');
  table.text('name').notNullable();
  table.text('description').notNullable();
  table.text('picture').defaultTo(null);
  table.float('price');
  table.integer('category_id').references('id').inTable('dish_categories');

  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable('dishes');