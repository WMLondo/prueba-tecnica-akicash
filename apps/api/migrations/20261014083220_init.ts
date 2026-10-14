import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('client', (table) => {
    table.increments('id').primary();
    table.string('full_name', 255).notNullable();
    table.string('dni', 32).notNullable().unique();
    table.decimal('monthly_income', 12, 2).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('loan_application', (table) => {
    table.increments('id').primary();
    table
      .integer('client_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('client');
    table.decimal('requested_amount', 12, 2).notNullable();
    table.integer('term_months').unsigned().notNullable();
    table
      .enu('status', ['pending', 'approved', 'rejected'])
      .notNullable()
      .defaultTo('pending');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.index(['status', 'created_at']);
  });

  await knex.schema.createTable('installment', (table) => {
    table.increments('id').primary();
    table
      .integer('loan_application_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('loan_application');
    table.date('due_date').notNullable();
    table.decimal('amount', 12, 2).notNullable();
    table.boolean('paid').notNullable().defaultTo(false);
    table.index(['due_date', 'paid'], 'idx_installment_due_paid');
    table.index(['loan_application_id'], 'idx_installment_loan_app');
  });

  await knex('client').insert([
    {
      full_name: 'Ana Pérez',
      dni: 'V-12345678',
      monthly_income: 1500,
    },
    {
      full_name: 'Carlos Gómez',
      dni: 'V-87654321',
      monthly_income: 2200,
    },
    {
      full_name: 'María López',
      dni: 'V-11223344',
      monthly_income: 1800,
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('installment');
  await knex.schema.dropTableIfExists('loan_application');
  await knex.schema.dropTableIfExists('client');
}

