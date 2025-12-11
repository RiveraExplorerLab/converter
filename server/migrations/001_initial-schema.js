export const up = (pgm) => {
  // Enable UUID generation
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  // Users table
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    email: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    password_hash: {
      type: 'varchar(255)',
      notNull: true,
    },
    created_at: {
      type: 'timestamptz',
      default: pgm.func('NOW()'),
    },
    updated_at: {
      type: 'timestamptz',
      default: pgm.func('NOW()'),
    },
  });

  // Jobs table
  pgm.createTable('jobs', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    status: {
      type: 'varchar(20)',
      notNull: true,
      default: 'pending',
      check: "status IN ('pending', 'processing', 'completed', 'failed')",
    },
    original_filename: {
      type: 'text',
      notNull: true,
    },
    original_path: {
      type: 'text',
      notNull: true,
    },
    output_path: {
      type: 'text',
    },
    options: {
      type: 'jsonb',
      default: '{}',
    },
    error_message: {
      type: 'text',
    },
    created_at: {
      type: 'timestamptz',
      default: pgm.func('NOW()'),
    },
    updated_at: {
      type: 'timestamptz',
      default: pgm.func('NOW()'),
    },
  });

  // Indexes
  pgm.createIndex('jobs', 'user_id');
  pgm.createIndex('jobs', 'status');
};

export const down = (pgm) => {
  pgm.dropTable('jobs');
  pgm.dropTable('users');
};
