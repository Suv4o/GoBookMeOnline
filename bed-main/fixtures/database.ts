#!/usr/bin/env node
import * as dotenv from 'dotenv';
import * as yargs from 'yargs';
import { Pool } from 'pg';
const env = dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

const pool = new Pool({
  user: env.parsed.DB_USER,
  host: env.parsed.DB_HOST,
  database: env.parsed.DB_NAME,
  password: env.parsed.DB_PASSWORD,
  port: Number(env.parsed.DB_PORT),
});

pool.connect();

yargs
  .command('create', 'create schema', () => {
    pool.query('CREATE SCHEMA IF NOT EXISTS public ', (err) => {
      if (err) throw err;
      console.log('DATABASE SCHEMA - CREATED ');
      pool.end();
      process.exit(0);
    });
  })

  .command(
    'drop',
    'drop schema',
    () => {
      pool.query('DROP SCHEMA IF EXISTS public CASCADE', (err) => {
        if (err) throw err;
        console.log('DATABASE SCHEMA - DROPPED ');
        pool.end();
        process.exit(0);
      });
    },
    (argv) => {
      console.log(argv);
    },
  ).argv;
